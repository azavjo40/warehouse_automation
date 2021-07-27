import { Schema, model } from "mongoose"
const SecretKey = new Schema({
  privateK: { type: String, required: true },
  publicK: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
})
export default model("SecretKey", SecretKey)
