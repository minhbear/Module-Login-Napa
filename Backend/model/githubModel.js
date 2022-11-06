const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const githubSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
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

module.exports = mongoose.model('GithubAccount', githubSchema);