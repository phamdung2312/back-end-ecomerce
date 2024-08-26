const bcrypt = require("bcrypt");
const Order = require("../models/OrderModel");
const jwt = require("../services/jwtService");
const Product = require("../models/ProductModel");
const MailerService = require("../services/MailerService");
const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      fullName,
      address,
      phone,
      city,
      paymentMethod,
      shippingPrice,
      totalPrice,
      user,
      isPaid,
      paidAt,
      email,
      status,
    } = newOrder;
    try {
      if (
        !orderItems &&
        !fullName &&
        !address &&
        !phone &&
        !city &&
        !paymentMethod &&
        !shippingPrice &&
        !totalPrice &&
        !user &&
        !isPaid &&
        !paidAt &&
        !status
      ) {
        reject({
          status: "ERR",
          message: "The data is required",
        });
      }
      let product = [];
      const promises = orderItems.map(async (order) => {
        const temp = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: -order.amount,
              selled: +order.amount,
            },
          },
          { new: true }
        );
        product.push(temp);
      });

      // Đợi tất cả các promises hoàn thành
      await Promise.all(promises);
      if (product) {
        const createOrder = await Order.create({
          orderItems: orderItems,
          shippingAddress: { fullName, address, city, phone },
          paymentMethod,
          shippingPrice,
          totalPrice,
          user,
          isPaid,
          paidAt,
          status,
        });
        if (createOrder) {
          await MailerService.sendEmailCreateOrder(email, orderItems);
          resolve({
            status: "OK",
            message: `success`,
          });
        }
      } else {
        reject({
          status: "ERR",
          message: `not success`,
        });
      }

      // const newData = results && results.filter((item) => item.id);
      // if (newData.length) {
      //   resolve({
      //     status: "ERR",
      //     message: `San pham voi id${newData.join(",")} khong du hang`,
      //   });
      // }
      // resolve({
      //   status: "OK",
      //   message: `success`,
      // });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.find({ user: orderId });
      if (!checkOrder) {
        resolve({
          status: "ERROR",
          message: "The Order is not found",
        });
      }
      resolve({
        status: "OK",
        message: "get order detail success",
        data: checkOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getOrderDetail = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({ _id: orderId });
      if (!checkOrder) {
        resolve({
          status: "ERROR",
          message: "The Order is not found",
        });
      }
      resolve({
        status: "OK",
        message: "get order detail success",
        data: checkOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const cancleOrderProduct = (orderId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      data.map(async (order) => {
        const product = await Product.findOneAndUpdate(
          {
            _id: order.product,
            selled: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: +order.amount,
              selled: -order.amount,
            },
          },
          { new: true }
        );
      });
      const order = await Order.findByIdAndDelete(orderId);
      if (order) {
        resolve({
          status: "OK",
          message: `success`,
        });
      } else {
        resolve({
          status: "OK",
          message: `ERR`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProductAdmin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.find();
      resolve({
        status: "OK",
        message: "get all order success",
        data: checkOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const updateOrder = (orderId, statusOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserID = await Order.findOne({ _id: orderId });
      if (checkUserID === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }
      // update Order
      const updateOrder = await Order.updateOne(
        { _id: orderId },
        { status: statusOrder },
        {
          new: true,
        }
      );

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllOrder,
  createOrder,
  getOrderDetail,
  cancleOrderProduct,
  getAllProductAdmin,
  updateOrder,
};
