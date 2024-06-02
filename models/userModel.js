const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type : String,
        required: true,
        min: 8},
    profilePicture: {
        type: String,
        default: "",
        },
    coverPicture: {
        type: String,
        default: ""},
    followers: {
        type: Array,
        default: []},
    followings: {
        type: Array,
        default: []},
    isAdmin: {
        type: Boolean,
        default: false},
    desc: {type: String,
        max: 50},
    city: {
        type: String,
        max: 50},
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);