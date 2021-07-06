import { Schema, model } from "mongoose"
const User = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  position: { type: String, required: true },
  date: { type: Date, default: Date.now },
})
export default model("User", User)
