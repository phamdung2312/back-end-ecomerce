const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      decription,
      discountPrice,
    } = req.body;

    if (
      !name ||
      !image ||
      !type ||
      !price ||
      !countInStock ||
      !rating ||
      !decription ||
      !discountPrice
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The product not found",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteProductMany = async (req, res) => {
  try {
    const productIds = req.body;
    const response = await ProductService.deleteProductMany(productIds);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const data = req.body;
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The product not found",
      });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const param = req.query;
    const { limit, page, sort, filter } = param;
    const response = await ProductService.getAllProduct(
      Number(limit) || null,
      Number(page) || 1,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getProductDetail = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The user not found",
      });
    }
    const response = await ProductService.getProductDetail(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getTypeProduct = async (req, res) => {
  try {
    const response = await ProductService.getTypeProduct();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getProductDetail,
  deleteProductMany,
  getTypeProduct,
};
