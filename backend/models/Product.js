const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String, required: true },
    weight: { type: Number, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    halalCertified: { type: Boolean, default: false },
    halalCertificate: { type: String },
    deliveryTime: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
