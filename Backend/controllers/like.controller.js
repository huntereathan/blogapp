const Like = require('../model/Likes')
const Article = require('../model/Articles');

exports.likearticle = async(req, res) => {
    const idarticle = req.params.id;
    const iduser = req.user._id;
    try{
        const article = await Article.findById(idarticle);
        if(!article){
            return res.status(400).send("No article found")
        }else
            try{
                const isliked = await Like.findOne({author_id: idarticle, user_id: iduser})
                if(!isliked){
                    const newlike = new Like({
                        user_id: iduser,
                        article_id: idarticle
                    })
                    try{
                        await newlike.save();
                        res.status(200).send("Saved Successfully");
                    }catch(err){
                        res.send("Error newlikeL " + err);
                    }
                }else
                    res.status(400).send("User already liked");
            }catch(err){
                res.status(400).send("Error like:  " + err);
            }     
    }catch(err){
        res.status(400).send("Error article: " + err);
    }
}

exports.removelike = async(req, res) => {
    const idarticle = req.params.id;
    const iduser = req.user._id;
    try{
        const article = await Article.findById(idarticle);
        if(!article)
            return res.status(400).send("No article found")
        else
            try{
                const isliked = await Like.findOne({author_id: idarticle, article_id: iduser})
                if(isliked)
                    try{
                        await Like.findByIdAndDelete(isliked._id);
                        res.status(200).send("Deleted Successfully")
                    }
                    catch(err){
                        res.send("Error deletelike: " + err);
                    }
                else
                    res.status(400).send("User already liked");
            }catch(err){
                res.status(400).send(err);
            }
    }catch(err){
        res.status(400).send("Error: " + err);
    }
}

exports.likecount = async(req, res) => {
    try{
        const article = await Like.find({article_id: req.params.id})
        res.json(article.length);
    }catch(err){
        res.send(err);
    }
}

