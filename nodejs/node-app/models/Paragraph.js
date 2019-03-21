const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParagraphSchema = new Schema({
    paragraph_id: {
        type: Number,
        default: -1
    },
    movie_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_avatar: {
        type: String,
    },
    reply_name:{
        type: String,
        default:'0'
    },
    reply_avatar: {
        type: String,
        default: '0'
    },
    content: {
        type: String,
        required: true
    },
    like_num:{
        type:Number,
        default: 0
    },
    children_paragraph: {
        type: Number,
        default: 0
    },
    parent_paragraph: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = Paragraph = mongoose.model("paragraph", ParagraphSchema);