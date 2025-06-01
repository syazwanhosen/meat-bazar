const mongoose = require("mongoose");

const halalCertificateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Make sure this matches your User model name
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("HalalCertificate", halalCertificateSchema);
