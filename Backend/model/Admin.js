const mongoose = require('mongoose');


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 256,
        unique: true,
    },
    email: {
    //    type:String,
    //    required: true,
    //    max: 256,
    //    min: 6,
    //    unique: true

       type: String,
       trim: true,
       lowercase: true,
       unique: true,
       required: 'Email address is required',
       validate: [validateEmail, 'Please fill a valid email address'],
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    mobileno: {
        type: String,
        required: true,
        unique: true
    },
    // about: {
    //     type: String,
    //     max: 1000
    // }

}, {timestamps: true});

module.exports = mongoose.model('admin', adminSchema);
