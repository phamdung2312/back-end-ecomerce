const bcrypt = require("bcrypt");
const Product = require("../models/ProductModel");
const jwt = require("./jwtService");
const { rejects } = require("assert");
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      decription,
      discountPrice,
    } = newProduct;
    try {
      const checkName = await Product.findOne({ name: name });
      if (checkName !== null) {
        reject({
          status: "ERR",
          message: "The name already",
        });
      }
      const createProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        decription,
        discountPrice,
      });
      if (createProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserID = await Product.findOne({ _id: productId });
      if (checkUserID === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }
      // delete User
      await Product.findByIdAndDelete(productId);
      resolve({
        status: "OK",
        message: "delete is success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteProductMany = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // delete Many Product
      await Product.deleteMany({ _id: productId._id });
      resolve({
        status: "OK",
        message: "delete Product is success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateProduct = (productId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserID = await Product.findOne({ _id: productId });
      if (checkUserID === null) {
        reject({ status: "ERR", message: "product is not defind" });
      }
      const updateProduct = await Product.findByIdAndUpdate(productId, data, {
        new: true,
      });

      resolve({ status: "OK", message: "UPDATE SUCCESS", data: updateProduct });
    } catch (error) {
      reject(error);
    }
  });
};
const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    let objectSort = {};
    let objectFilter = {};
    try {
      if (filter) {
        objectFilter = { [filter[0]]: { $regex: filter[1] } };
      }
      if (sort) {
        objectSort = { [sort[1]]: sort[0] };
      }
      const allProducts = await Product.find()
        .limit(limit)
        .skip(limit * (page - 1))
        .sort(objectSort)
        .find(objectFilter);
      const totalProduct = await Product.length;

      resolve({
        status: "OK",
        message: "get all products success",
        data: allProducts,
        totalProduct: totalProduct + 1,
        totalPage: Math.ceil((totalProduct + 1) / limit),
        pageCurrent: page,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getProductDetail = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: productId });
      if (!checkProduct) {
        resolve({
          status: "ERROR",
          message: "The product is not found",
        });
      }

      resolve({
        status: "OK",
        message: "get product detail success",
        data: checkProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getTypeProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "get product type success",
        data: checkProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
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
