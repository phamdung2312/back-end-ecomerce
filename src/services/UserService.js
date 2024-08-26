const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("../services/jwtService");
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = newUser;
    try {
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail !== null) {
        resolve({
          status: "ERR",
          message: "The email already",
        });
      }

      // mã hóa mật khẩu
      const hash = await bcrypt.hash(password, 10);

      const createUser = await User.create({
        email,
        password: hash,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const loginUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = newUser;
    try {
      const checkEmail = await User.findOne({ email: email });

      if (checkEmail === null) {
        resolve({
          status: "ERR",
          message: "The email not found",
        });
      }
      // mã hóa mật khẩu
      const comparePassword = await bcrypt.compare(
        password,
        checkEmail.password
      );
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or email incorrect",
        });
      }
      const access_token = await jwt.genneralAccessToken({
        id: checkEmail.id,
        isAdmin: checkEmail.isAdmin,
      });
      const refresh_token = await jwt.genneralRefreshToken({
        id: checkEmail.id,
        isAdmin: checkEmail.isAdmin,
      });
      if (checkEmail) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
          refresh_token,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateUser = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserID = await User.findOne({ _id: userId });
      if (checkUserID === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }
      // update User
      const updateUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserID = await User.findOne({ _id: userId });
      if (checkUserID === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }
      // delete User
      await User.findByIdAndDelete(userId);
      resolve({
        status: "OK",
        message: "delete is success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      // delete User
      await User.deleteMany(ids);
      resolve({
        status: "OK",
        message: "delete is success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // get all User
      const allUsers = await User.find();
      resolve({
        status: "OK",
        message: "get All user is success",
        data: allUsers,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getUserDetails = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserID = User.findOne(userId);
      if (!checkUserID) {
        reject({
          status: "ERROR",
          message: "The user is not found",
        });
      }
      const user = await User.findById(userId);
      resolve({
        status: "OK",
        message: "get user detail is success",
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserDetails,
  deleteManyUser,
};
