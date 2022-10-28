require('dotenv').config();
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');
const User = require("../model/User");

module.exports = async function(req, res, next){
    const token = req.header('auth-token');
    // console.log("token: " + token);
    console.log(token)
    if(!token) return res.status(401).send('Access Denied');
    try{
        // console.log("first: ")
        console.log(token)
        let val = token.replace(/^Bearer\s/, '');
        // console.log("second: ")
        console.log(val)
        // console.log("typeof");
        // console.log(typeof token)
        const verified = jwt.verify(val, process.env.TOKEN_SECRET);
        console.log(verified)
        // try{
        //   await User.findById(verified.userinfo.id);
        // }catch(err){
        //   res.send(err);
        // }
        // console.log(verified.userinfo)
        try{
            const user = await User.findById(verified.userinfo._id)
            // console.log("user: " + user)
            if(user)
             req.role = "user";
            else{
                const admin = await Admin.findById(verified.userinfo._id)
                // console.log("admin: " + admin)
                if(admin)
                  req.role = "admin";
            }
        }catch(err){
            res.json(err);
        }
        // console.log(verified)
        req.user = verified.userinfo;
        next();
    }catch(err){
        res.json(err);
    }
}