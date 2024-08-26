const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const orderController = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/AuthMiddleware");

router.get("/config", (req, res) => {
  return res.status(200).json({
    status: "OKE",
    data: process.env.CLIENTID,
  });
});
module.exports = router;
