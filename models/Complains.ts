import { Schema, model } from "mongoose";

const Complain = new Schema({
  username: String,
  email: String,
  mobile: String,
  subject: String,
  content: String,
});

export default model("Complain", Complain);
