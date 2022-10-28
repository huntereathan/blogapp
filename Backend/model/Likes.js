const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
}, {timestamps: true})

module.exports = mongoose.model('like', articleSchema);