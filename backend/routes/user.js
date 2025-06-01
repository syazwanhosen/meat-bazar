const express = require("express");
const User = require("../models/User");
const router = express.Router();
const auth = require("../middleware/auth")
const multer = require("multer");
const path = require("path");

// Store uploads in /uploads directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

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

            seller.approved = "approved";
            await seller.save();

            res.json({ message: "Supplier approved successfully", seller });
        } catch (error) {
            res.status(500).json({ message: "Error approving seller", error });
        }
    });
    // ✅ Admin: Reject Supplier
    router.put("/reject-seller/:id", auth, async (req, res) => {
        try {
            const seller = await User.findById(req.params.id);
            if (!seller) return res.status(404).json({ message: "Supplier not found" });

            seller.approved = "rejected";
            await seller.save();

            res.json({ message: "Supplier rejected successfully", seller });
        } catch (error) {
            res.status(500).json({ message: "Error rejectingg seller", error });
        }
    });

    // ✅ Delete seller
    router.delete("/delete-seller/:id", auth, async (req, res) => {
        try {
            const seller = await User.findById(req.params.id);
            if (!seller) return res.status(404).json({ message: "Seller not found" });

            await seller.deleteOne();

            res.status(200).json({ message: "Seller deleted" });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    });

});

router.put("/:id", auth, upload.single("profilePicture"), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to edit this profile" });
        }

        // ✅ Update user fields
        const { name, email, address } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (address) user.address = address;

        // ✅ Save uploaded profile picture path
        if (req.file) {
            user.profilePicture = req.file.path; // Save relative file path
        }

        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile", error });
    }
});


router.get("/seller", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -__v");
        if (!user) return res.status(404).json({ message: "Seller not found" });

        // Optionally check if user.role === "supplier" or "seller" if you want
        // if (user.role !== "supplier") return res.status(403).json({ message: "Not a supplier" });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching seller info" });
    }
});

module.exports = router;




module.exports = router;
