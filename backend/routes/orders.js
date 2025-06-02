const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const router = express.Router();
const auth = require("../middleware/auth")

// Create Order from Cart
router.post("/", async (req, res) => {
    try {
        // Add orderTime with current time if not provided
        if (!req.body.orderTime) {
            req.body.orderTime = new Date();
        }

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


router.get("/seller/:sellerId", auth, async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        // 1. Get all products by seller
        const products = await Product.find({ seller: sellerId });
        const productIds = products.map((p) => p._id);

        // 2. Get orders where productId is in seller's products
        const orders = await Order.find({ productId: { $in: productIds } })
            .populate("buyer", "name")       // get buyer's name
            .populate("productId", "name")     // get product name
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map((order) => ({
            productName: order.productId?.name || "Unknown",
            buyerName: order.buyer?.name || "Unknown",
            quantity: order.quantity,
            total: order.total,
            address: order.address,
            phone: order.phone,
            orderNotes: order.orderNotes,
            createdAt: order.createdAt,
        }));

        res.json(formattedOrders);
    } catch (err) {
        console.error("Error fetching seller's product orders:", err);
        res.status(500).json({ error: "Failed to fetch order history." });
    }
});




module.exports = router;
