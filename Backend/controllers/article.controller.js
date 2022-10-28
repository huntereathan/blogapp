const Article = require('../model/Articles');
const mongoose = require('mongoose');
const moment = require("moment");

exports.allarticle = async(req, res) => {
        if(req.body.startDate){
            let [sd, sm, sy] = req.body.startDate.split("-").map(val => Number(val));
            let [ed, em, ey] = req.body.endDate.split("-").map(val => Number(val));
            
            const startDateobj = new Date(sy, sm - 1, sd, "00", "00", "00", "00");
            
            const endDateobj = new Date(ey, em - 1, ed, "00", "00", "00", "00");
            
            console.log("startDate: " + startDateobj);
            console.log("endDate: " + endDateobj);
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            if(!(page && limit)){
                try{
                    const article = await Article.find({ 
                            createdAt: {
                                $gte: startDateobj, 
                                $lt: endDateobj
                            }
                    })
                    res.send(article)
                }catch(err){
                    return res.json(err);
                }
            }else{
                try{
                    const article = await Article.find({ 
                            createdAt: {
                                $gte: startDateobj, 
                                $lt: endDateobj
                            }
                    }).limit(limit).skip((page - 1) * limit);
                return res.json(article)
                }catch(err){
                    return res.json(err);
                }
            }
        }else if(req.pageresult)
            return res.json(req.pageresult);
        else{
            try{
                const article = await Article.find();
                return res.json(article);
            }catch(err){
                return res.status(403).json(err);
            }
        }
}

exports.articlebyuser = async(req, res) => {
    try{
        const article = await Article.find({author_id: req.params.id});
        res.json(article)
    }catch(err){
        res.status(403).json(err);
    }   
}

exports.articlebyid = async(req, res) => {
    try{
        const article_id = req.params.id;
        const article = await Article.findById(article_id).populate('author_id', {password:0}).exec();
        res.send(article);
    }catch(err){
        res.status(403).send(err)
    }

}

exports.createNewArticle = async(req, res) => {
    console.log(Array.isArray(req.body))
    if(Array.isArray(req.body)){
        req.body.forEach( async(element) => {
            const newArticle = new Article({
                title: element.title,
                author_id: req.user._id,
                description: element.description,
            })
            try{
                await newArticle.save();
            }catch(err){
                res.send("Error: " + err);
            }
        });
        res.send("Success")     
    }else{
        const newArticle = new Article({
            title: req.body.title,
            author_id: req.user._id,
            description: req.body.description,
        })
        try{
            const article = await newArticle.save();
            res.json(article);
        }catch(err){
            res.send("Error: " + err);
        }
    }
}

exports.updateArticle = async(req, res) => {
    try{
        const checkuser = await Article.findById(req.params.id);
    
        if(checkuser.author_id.toString() === req.user._id){
            try{
                const {user, ...others} = req.body;
                const article = await Article.findByIdAndUpdate(req.params.id, others);
                res.status(201).json(article);
            }catch(err){
                res.status(400).send("Error1: " + err);
            }
        }
        else{
            return res.status(401).send("Unathorize access")
        }
    }catch(err){
        res.send("Error: " + err);
    }
}


exports.deleteArticle = async(req, res) => {
    try{
        const checkuser = await Article.findById(req.params.id);
        if(checkuser.author_id.toString() === req.user._id){
            try{
                const article = await Article.findByIdAndDelete(req.params.id);
                res.status(201).json(article);
            }catch(err){
                res.status(400).send("Error: " + err);
            }
        }
        else{
            return res.status(401).send("Unathorized access")
        }
    }catch(err){
        res.send("Error: " + err);
    }
}

exports.deletemultiplearticle = async(req, res) => {
    try{
        await Article.deleteMany({_id: {$in:req.body.deleteid}})
        res.status(200).send("Deleted Successfully");
    }catch(err){
        res.send("Error: " + err)
    }
}

// ids = ['123', '234', '345'];

// await model.deleteMany({_id:{$in:ids}})

exports.userarticle = async(req, res) => { 
    try{
        const article = await Article.find({author_id: req.user._id})
        console.log(article)
        res.json(article);
    }catch(err){
        res.json(err);
    }
}