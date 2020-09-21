import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Complains from "./models/Complains";
import Contact from "./models/Contact";
interface ContactType {
  name: string;
  number: string;
  owner?: string;
}

const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGO!;
const app = express();
app.use(express.json());
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected sucessfully"))
  .catch((err) => console.log(err.message));

app.post("/contacts", (req, res) => {
  const { owner, contacts, by, value } = req.body as {
    owner?: string;
    contacts: ContactType[];
  } & { by: "name" | "number"; value: string };
  if (contacts) {
    let contactsToSave: ContactType[] = contacts;
    if (owner) {
      contactsToSave = contacts.map((contact) => ({
        ...contact,
        owner,
      }));
    }
    Contact.insertMany(contactsToSave);
  }
  Contact.find({ [by]: { $regex: value, $options: "i" } })
    .select("name number owner")
    .limit(15)
    .then((contacts) => res.send(contacts))
    .catch(() => res.status(400).send("Error"));
});

app.get("/contacts/:by/:value/:offset", (req, res) => {
  console.log(req.params);
  const { by, value, offset } = req.params as { offset: string } & {
    by: "name" | "number";
    value: string;
  };
  Contact.find({ [by]: { $regex: value, $options: "i" }, _id: { $gt: offset } })
    .select("name number owner")
    .limit(20)
    .then((contacts) => res.send(contacts))
    .catch(() => res.status(400).send("Error"));
});
app.post("/complains", async (req, res) => {
  try {
    await Complains.create(req.body);
    res.send("done");
  } catch (e) {
    console.log(e);
  }
});
app.get("/privacy", (_, res) => {
  res.send(`الشروط وسياسة الخصوصية كمجتمع تعاوني، ستكون أولوية موقع وتطبيق Find Caller World دائماً علاقته بالمجتمع والمستخدمين.
  موقع وتطبيق Find Caller World ملتزم بشدة بأمن وحماية السلامة الشخصية لمستخدمينا وجهات اتصالهم وخدمة موقع وتطبيق Find Caller World، كما هو موضح في هذه الوثيقة.`);
});
app.listen(PORT, () => {
  console.log("App is listening on " + PORT);
});
