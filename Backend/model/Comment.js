const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articles'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('comment', commentSchema);