require('dotenv').config();
const User = require('../model/User');
const Admin = require('../model/Admin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        mobileno: req.body.mobileno,
        about: req.body.about
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
}

exports.login = async(req, res) => {

    const { email, username, mobileno} = req.body;
    let user;
    // const user =users.find((user) => user.id == id);
    if(email){
        user = await User.findOne({email: email});
        if(!user){
            user = await Admin.findOne({email: email})
            if(!user)
                return res.status(400).json({message: 'Email doesn\'t exist'});
        } 
    }
    else if(username){
        user = await User.findOne({username: username});
        if(!user){
            user = await Admin.findOne({username: username})
            if(!user)
                return res.status(400).json({message: 'Username doesn\'t exist'});
        } 
    }
    else if(mobileno){
        user = await User.findOne({mobileno: mobileno});
        if(!user){
            user = await Admin.findOne({mobileno: mobileno})
            if(!user)
                return res.status(400).json({message: 'MobileNumber doesn\'t exist'});
        } 
        // if(!user) return res.status(400).send('Mobile Number doesn\'t exist');
    }else{
        return res.status(400).json({message: 'Enter username, mobileno, email'})
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({message: 'Invalid password'});

    const {password, about, ...others} = user._doc;
    // console.log(others);
    // console.log(password);
    const token = jwt.sign({userinfo: others}, process.env.TOKEN_SECRET);
    res.json(token);
}