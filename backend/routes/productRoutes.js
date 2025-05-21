const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct, // ✅ Funksion për përditësim
} = require("../controllers/productController");

router.get("/", getProducts);              // Merr të gjithë produktet
router.post("/", createProduct);           // Krijo produkt të ri
router.get("/:id", getProductById);        // Merr një produkt sipas ID-së
router.delete("/:id", deleteProduct);      // Fshi një produkt sipas ID-së
router.put("/:id", updateProduct);         // ✅ Përditëso një produkt

module.exports = router;
