const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParagraphSchema = new Schema({
    
    movie_id: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_avatar: {
        type: String,
    },
    content: {
        type: String,
        required: true
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