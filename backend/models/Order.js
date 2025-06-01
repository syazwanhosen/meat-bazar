const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryFee: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    orderStatus: { type: String, enum: ["processing", "shipped", "delivered", "cancelled"], default: "processing" },
    orderNotes: { type: String }, // optional
    createdAt: { type: Date, default: Date.now },
    orderTime: { type: Date, default: Date.now },  // <--- add this
});

module.exports = mongoose.model("Order", OrderSchema);
