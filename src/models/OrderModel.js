const mongoose = require("mongoose");
const Product = require("./ProductModel");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: "string", required: true },
        amount: { type: Number, required: true },
        image: { type: "string", required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: "string", required: true },
      address: { type: "string", required: true },
      city: { type: "string", required: true },
      country: { type: "string", required: false },
      phone: { type: Number, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    itemsPrice: { type: Number, required: false },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
