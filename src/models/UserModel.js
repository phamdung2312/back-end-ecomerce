const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: "string", required: false },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    isAdmin: { type: "boolean", default: false, required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    city: { type: String },
  },

  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
