const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../models/Product");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await getAllProducts());
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
});

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
});

module.exports = router;
