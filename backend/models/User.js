const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
    approved: { type: String, default: null }, // ✅ Admin approval required for suppliers
    profilePicture: { type: String },
    address: { type: String },

});

// ✅ Auto-approve buyers upon registration
UserSchema.pre("save", function (next) {
    if (this.role === "buyer") {
        this.approved = true;
    }
    next();
});

module.exports = mongoose.model("User", UserSchema);
