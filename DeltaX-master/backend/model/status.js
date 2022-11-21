const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 32,
        minlength: 3
    }
}, { timestamps: true })

const statusModel = mongoose.model("status", statusSchema);

module.exports = statusModel;