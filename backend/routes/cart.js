const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/auth")
const router = express.Router();

// Add to Cart
router.post("/", auth, async (req, res) => {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
});

// Get Cart Items
router.get("/:userId", auth, async (req, res) => {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
});

// Remove Item from Cart
router.delete("/:userId/:productId", auth, async (req, res) => {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
    await cart.save();
    res.json({ message: "Item removed", cart });
});

// Clear Cart
router.delete("/:userId", auth, async (req, res) => {
    await Cart.findOneAndDelete({ user: req.params.userId });
    res.json({ message: "Cart cleared" });
});

module.exports = router;
