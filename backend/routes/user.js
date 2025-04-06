const express = require("express");
const User = require("../models/User");
const router = express.Router();
const auth = require("../middleware/auth")

// ✅ Get List of All Sellers
router.get("/sellers", async (req, res) => {
    try {
        const sellers = await User.find({ role: "seller" }).select("name email approved"); // Exclude passwords
        res.json(sellers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sellers", error });
    }

    // ✅ Admin: Approve Supplier
    router.put("/approve-seller/:id", auth, async (req, res) => {
        try {
            const seller = await User.findById(req.params.id);
            if (!seller) return res.status(404).json({ message: "Supplier not found" });

            seller.approved = true;
            await seller.save();

            res.json({ message: "Supplier approved successfully", seller });
        } catch (error) {
            res.status(500).json({ message: "Error approving seller", error });
        }
    });
});

// ✅ Supplier: Edit Profile
router.put("/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to edit this profile" });
        }

        // ✅ Update user profile fields
        const { name, email } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
});



module.exports = router;
