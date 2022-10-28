const Comment = require("../model/Comment");

exports.getcommentbyid = async(req, res) => {
    try{
        const articleComments = await Comment.find({article_id : req.params.id});
        res.json(articleComments);
    }catch(err){
        res.status(403).send(err);
    }
}

exports.postnewcomment = async(req, res) => {
    const newComment = new Comment({
        article_id: req.params.id,
        user_id: req.user._id,
        comment: req.body.comment
    })
    try{
        const comment = await newComment.save();
        res.json(comment);
    }catch(err){
        res.status(400).send("CommentError: " + err);
    }
}

exports.deletecomment = async(req, res) => {
    const idarticle = req.params.id;
    const iduser = req.user._id;
    try{
        const article = await articleModel.findById(idarticle);
        if(!article)
            return res.status(400).send("No article found")
        else
            try{
                const iscomment = await Comment.findOne({author_id: idarticle, article_id: iduser})
                if(iscomment)
                    try{
                        await Comment.findByIdAndDelete(iscomment._id);
                        res.status(200).send("Deleted Successfully")
                    }
                    catch(err){
                        res.send("Error deletecomment: " + err);
                    }
                else
                    res.status(400).send("No Comment found");
            }catch(err){
                res.status(400).send(err);
            }
    }catch(err){
        res.status(400).send("Error: " + err);
    }
}