const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const {
  authUserMiddleware,
  authMiddleware,
} = require("../middleware/AuthMiddleware");

router.post("/create", productController.createProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.post(
  "/delete-many",
  authMiddleware,
  productController.deleteProductMany
);
router.put("/update/:id", authUserMiddleware, productController.updateProduct);
router.get("/get-all", productController.getAllProduct);
router.get("/get-detail/:id", productController.getProductDetail);
router.get("/get-type", productController.getTypeProduct);

module.exports = router;
