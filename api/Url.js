const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        unique: true,
        required: true,
        max:6,
        min:6,
    },
}, { timestamps: true })

module.exports = mongoose.model("URL", UrlSchema);