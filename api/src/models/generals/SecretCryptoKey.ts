import { Schema, model } from "mongoose"
const SecretCryptoKey = new Schema({
  privateKey: { type: String, required: true },
  publicKey: { type: String, required: true },
  userId: {},
  date: { type: Date, default: Date.now },
})
export default model("SecretCryptoKey", SecretCryptoKey)
