const User = require('../model/User');

exports.userInformation = async(req, res) => {
    try{
        let userinfo = await User.findById(req.params.id);
        let {password, ...others} = userinfo._doc;
        res.json(others);
    }catch(err){
        res.send("Error: " + err);
    }
}

exports.userUpdate = async(req, res) => {
    if(req.params.id === req.user._id){
        try{
            const {user, ...others} = req.body;
            const userInfoAfterUpdate = await User.findByIdAndUpdate(req.params.id, others);
            res.json(userInfoAfterUpdate);
        }catch(err){
            res.send("Error: " + err);
        }
    }else{
       res.status(401).send("Unathorized access")
    }
    // res.json(req.user);
}

exports.deleteUser = async(req, res) => {
    if(req.params.id === req.user._id){
        try{
            const {user, ...others} = req.body;
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send("Deleted Successfully")
        }catch(err){
            res.send("Error: " + err);
        }
    }else{
        res.status(401).send("Unathorized access")
    }
}

exports.userfollow = async(req, res) => {
    try{
        await User.findByIdAndUpdate(req.body.followId, {
            $push: {followers: req.user._id}
        }, {new:true}) 
        try{
            await User.findByIdAndUpdate(req.user._id, {
                $push: {following : req.body.followId}
            }, {new:true})
        }catch(err){
            res.send("Error: " + err);
        }
        res.status(200).send("Success follow")  
    }catch(err){
        res.send("Error: " + err);
    }
    
}

exports.userunfollow = async(req, res) => {
    try{
        await User.findByIdAndUpdate(req.body.followId, {
            $pull: {followers: req.user._id}
        }, {new:true}) 
        try{
            await User.findByIdAndUpdate(req.user._id, {
                $pull: {following : req.body.followId}
            }, {new:true})
        }catch(err){
            res.send("Error: " + err);
        }
        res.status(200).send("Success unfollow")  
    }catch(err){
        res.send("Error: " + err);
    }
    
}


exports.followcount = async(req, res) => {
    console.log(req.user._id);
    const user = await User.findById(req.user._id, "following followers");
    res.json({ "following": user.following.length, "follower": user.followers.length});
}




