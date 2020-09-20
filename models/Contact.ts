import { Schema, model } from "mongoose";

const Contact = new Schema({
  name: String,
  number: String,
  owner: String,
});

export default model("Contact", Contact);
