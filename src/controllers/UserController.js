const UserService = require("../services/UserService");
const jwtService = require("../services/jwtService");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const checkEmail = regexEmail.test(email);

    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!checkEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The email is invalid",
      });
    }
    // else if (password !== confirmPassword) {
    //   return res.status(200).json({
    //     status: "ERR",
    //     message: "The password is equal confirmPassword",
    //   });
    // }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const checkEmail = regexEmail.test(email);

    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!checkEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The email is invalid",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newresponse } = response;

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      samesite: "strict",
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The user not found",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteManyUser = async (req, res) => {
  try {
    const ids = req.body;
    const response = await UserService.deleteManyUser(ids);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The user not found",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The user not found",
      });
    }
    const response = await UserService.getUserDetails(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];

    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token not found",
      });
    }
    const response = await jwtService.refreshJWTToken(token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");

    return res.status(200).json({
      status: "OK",
      message: "Log out user successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { data: email } = req.body;
    console.log("email", email);
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const checkEmail = regexEmail.test(email);
    if (!checkEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The email is invalid",
      });
    }
    const response = await UserService.forgotPassword(email);
    console.log("response", response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const response = await UserService.resetPassword(id, token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updatePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { valueInputPassword, valueInputConfirmPassword } = req.body;
    if (valueInputPassword !== valueInputConfirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
    const response = await UserService.updatePassword(
      userId,
      valueInputPassword
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserDetails,
  refreshToken,
  logoutUser,
  deleteManyUser,
  forgotPassword,
  resetPassword,
  updatePassword,
};
