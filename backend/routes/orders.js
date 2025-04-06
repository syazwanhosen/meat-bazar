const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const router = express.Router();
const auth = require("../middleware/auth")

// Create Order from Cart
router.post("/", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: "Error creating order", error: err });
    }
});

// Get Orders for a User
router.get("/:userId", auth, async (req, res) => {
    const orders = await Order.find({ buyer: req.params.userId }).populate("products.product");
    res.json(orders);
});

// Update Order Status (Admin Only)
router.put("/:orderId", auth, async (req, res) => {
    const { orderStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { orderStatus }, { new: true });
    res.json({ message: "Order updated", order: updatedOrder });
});

// Delete Order (Admin Only)
router.delete("/:orderId", auth, async (req, res) => {
    await Order.findByIdAndDelete(req.params.orderId);
    res.json({ message: "Order deleted" });
});




module.exports = router;
