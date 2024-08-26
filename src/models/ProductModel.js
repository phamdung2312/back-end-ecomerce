const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: "string", required: true, unique: true },
    image: { type: "string", required: true },
    type: { type: "string", required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    decription: { type: "string" },
    discountPrice: { type: Number },
    selled: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
