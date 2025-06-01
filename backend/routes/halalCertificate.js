const express = require("express");
const router = express.Router();
const multer = require("multer");
const HalalCertificate = require("../models/HalalCertificate");

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// POST /api/halal-certificates
router.post("/", upload.single("certificate"), async (req, res) => {
    const { userId } = req.body;

    if (!req.file || !userId) {
        return res.status(400).json({ message: "User ID and file are required" });
    }

    try {
        const newCertificate = new HalalCertificate({
            userId,
            filePath: req.file.path,
        });

        await newCertificate.save();

        res.status(201).json({ message: "Halal certificate uploaded successfully", data: newCertificate });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// GET /api/halal-certificates?supplierId=<id>
router.get("/", async (req, res) => {
    try {
        const query = {};
        if (req.query.supplierId) {
            query.userId = req.query.supplierId;
        }

        const certificates = await HalalCertificate.find(query).populate("userId", "name");
        res.status(200).json(certificates);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});





module.exports = router;
