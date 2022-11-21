const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const leadSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

const LeadModel = mongoose.model("lead", leadSchema);

module.exports = LeadModel;