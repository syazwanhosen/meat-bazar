const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const router = express.Router();
const auth = require("../middleware/auth")

// Multer Storage (for image uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/products/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create a Product (Seller Only)
router.post("/", auth, upload.single("image"), async (req, res) => {
    const { name, description, price, category, weight, seller, halalCertified, halalCertificate, deliveryTime } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            weight,
            seller,
            halalCertified,
            halalCertificate,
            deliveryTime,
            image: req.file ? `/uploads/products/${req.file.filename}` : "",
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
});

// Get All Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().populate("seller", "name email");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

// Get a Single Product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("seller", "name email");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
});

// Update a Product (Seller Only)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
    try {
        const productData = {
            ...req.body,
        };

        // Handle image if uploaded
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            productData,
            { new: true }
        );

        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Update failed", error);
        res.status(500).json({ message: "Error updating product", error });
    }
});

// Delete a Product (Seller Only)
router.delete("/:id", auth, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});

// Get Products by Seller ID
router.get("/seller/:sellerId", async (req, res) => {
    try {
        const products = await Product.find({ seller: req.params.sellerId }).populate("seller", "name email");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching seller's products", error });
    }
});


module.exports = router;
