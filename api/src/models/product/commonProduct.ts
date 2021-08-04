import { Schema, model } from "mongoose"
const CommonProducts = new Schema({
  product_name: { type: String, required: true, unique: true },
  type_commodity: { type: String, required: true },
  quantity: { type: String, required: true },
})
export default model("CommonProducts", CommonProducts)
