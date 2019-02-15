const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    type: {
        type: String,
    },
    descibe: {
        type: String,
        required: true
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: false
    },
    remark: {
        type: String,
        required: false
    },
    Date: {
        type: Date,
        default: Date.now
    },
})

module.exports = Profile = mongoose.model("profile", ProfileSchema)