const express = require("express");

const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/AuthMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, userController.deleteUser);
router.get("/allUser", authMiddleware, userController.getAllUsers);
router.get(
  "/user-detail/:id",
  authUserMiddleware,
  userController.getUserDetails
);
router.post("/refresh-token", userController.refreshToken);
router.post("/delete-many", authMiddleware, userController.deleteManyUser);
router.post("/forgot-password", userController.forgotPassword);
router.get("/reset-password/:id/:token", userController.resetPassword);
router.put("/update-password/:id", userController.updatePassword);

module.exports = router;
