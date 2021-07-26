import { Schema, model } from "mongoose"
const Dispatch = new Schema({
  purveyor: { type: String, required: true },
  driver: { type: String, required: true },
  product_name: { type: String, required: true },
  type_commodity: { type: String, required: true },
  quantity: { type: String, required: true },
  product_namber: { type: String, required: true },
  sender_product: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
})
export default model("Dispatch", Dispatch)
