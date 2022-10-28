const Article = require('../model/Articles');
const mongoose = require('mongoose');

exports.allarticle = async(req, res) => {
    try{
        if(req.pageresult)
        res.json(req.pageresult);
        else
        throw "error";
    }catch(err){
        try{
            const article = await Article.find();
            res.json(article);
        }catch(err){
            res.status(403).send('No article found');
        }
    }

}

exports.articlebyuser = async(req, res) => {
    try{
        // let userarticles = {}; 
        // const articles = await Article.find();
        // articles.forEach((article => {
        //     if(article.author_id.toString() === req.params.id)
        //     userarticles.push(article);
        // }));
        // res.json(userarticles);
        const article = await Article.find({author_id: req.params.id});
        // console.log(article);
        res.json(article)
    }catch(err){
        res.status(403).send(err);
    }   
}

exports.articlebyid = async(req, res) => {
    try{
        const article_id = req.params.id;
        const article = await Article.findById(article_id).populate('author_id').exec();
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
        // console.log("author_id: " + checkuser.author_id + " type: " + typeof(checkuser.author_id));
        // console.log("login_id: " + req.user._id, " type: " + typeof(req.user._id))
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
    // res.send(req.body.deleteid)
}

// ids = ['123', '234', '345'];

// await model.deleteMany({_id:{$in:ids}})