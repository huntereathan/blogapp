const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true,
        min: 150
    }
}, {timestamps: true})

module.exports = mongoose.model('article', articleSchema);