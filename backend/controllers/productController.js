const Product = require("../models/productModel");

// Merr të gjithë produktet
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë marrjes së produkteve" });
  }
};

// Merr një produkt sipas ID-së
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produkti nuk u gjet" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë marrjes së produktit" });
  }
};

// Krijo një produkt të ri
exports.createProduct = async (req, res) => {
  try {
    const { title, type, description, price, imageUrls } = req.body;
    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res.status(400).json({ message: "Furnizoni të paktën një foto." });
    }

    const product = await Product.create({
      title,
      type,
      description,
      price,
      imageUrls,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Gabim gjatë krijimit të produktit:", err);
    res.status(500).json({ message: "Gabim gjatë krijimit të produktit" });
  }
};

// Përditëso një produkt
exports.updateProduct = async (req, res) => {
  try {
    const { title, type, description, price, imageUrls } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { title, type, description, price, imageUrls },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Produkti nuk ekziston për përditësim" });

    res.json(updated);
  } catch (err) {
    console.error("Gabim gjatë përditësimit:", err);
    res.status(500).json({ message: "Gabim gjatë përditësimit të produktit" });
  }
};

// Fshi një produkt
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Produkti nuk ekziston" });

    res.json({ message: "Produkti u fshi me sukses" });
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë fshirjes së produktit" });
  }
};
