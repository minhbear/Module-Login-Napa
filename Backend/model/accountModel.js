const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Account', accountSchema);