const orderService = require("../services/OrderService");
const jwtService = require("../services/jwtService");

const createOrder = async (req, res) => {
  try {
    const response = await orderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllOrder = async (req, res) => {
  console.log("productId");
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The order not found",
      });
    }
    const response = await orderService.getAllOrder(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getOrderDetail = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The order not found",
      });
    }
    const response = await orderService.getOrderDetail(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const cancleOrderProduct = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = req.body;
    if (!orderId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The order not found",
      });
    }
    const response = await orderService.cancleOrderProduct(orderId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllProductAdmin = async (req, res) => {
  try {
    const response = await orderService.getAllProductAdmin();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The order not found",
      });
    }
    const response = await orderService.updateOrder(orderId, status.value);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  getAllOrder,
  createOrder,
  getOrderDetail,
  cancleOrderProduct,
  getAllProductAdmin,
  updateOrder,
};
