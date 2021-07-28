import { Schema, model } from "mongoose"
const SecretKey = new Schema({
  privateKey: {},
  publicKey: {},
  userId: {},
  date: { type: Date, default: Date.now },
})
export default model("SecretKey", SecretKey)
