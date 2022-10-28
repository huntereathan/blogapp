const Admin = require('../model/Admin');
const User = require('../model/User')

exports.alluser = async(req, res) =>{
    if(req.role !== "admin"){
        return res.status(401).json('Unauthorized')
    }else{
        if(req.pageresult)
        return res.json(req.pageresult);
        else{
            const user = await Admin.findOne({email: req.user.email});
            if(!user) return res.status(401).json("Unauthorized");
            try{
                const user = await User.find();
                return res.json(user);
            }
            catch(err){
                return res.json(err);
            }
        } 
    }
}

exports.userdelete = async(req, res) => {
    if(req.role !== "admin"){
        return res.status(401).json('Unauthorized')
    }else{
        const id = req.params.id;
        try{
            await User.deleteOne({_id : id})
            return res.status(200).json({
                message: 'Deleted!'
            });
        }catch(err){
            return res.json(err)
        }  
    } 
}

exports.deletearticle = async(req, res) => {
    if(req.role !== "admin"){
        return res.status(401).json('Unauthorized')
    }else{
        // const user = await Admin.findOne({email: req.user.email});
        // if(!user) return res.status(401).send('Unauthorized');
        const id = req.params.id;
        try{
            await User.deleteOne({_id : id})
            return res.status(200).json({
                message: 'Deleted!'
            });
        }catch(err){
            return res.json(err)
        } 
    }  
}