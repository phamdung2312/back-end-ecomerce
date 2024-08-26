const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/AuthMiddleware");

router.post("/createOrder", orderController.createOrder);
router.get(
  "/get-all-order/:id",
  authUserMiddleware,
  orderController.getAllOrder
);
router.get(
  "/get-order-detail/:id",
  authUserMiddleware,
  orderController.getOrderDetail
);
router.delete("/cancle-order/:id", orderController.cancleOrderProduct);
router.get("/getAllOrder", authMiddleware, orderController.getAllProductAdmin);
router.put("/updateOrder/:id", orderController.updateOrder);

module.exports = router;
