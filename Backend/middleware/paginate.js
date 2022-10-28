const fun = function(model){
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        if(!(page && limit))
            next();
        if(page == 0)
        return res.send("Page cannot be 0");
        if(limit >  await model.countDocuments())
        return res.send("Limit is greater than number of document");
        try{
            const result = await model.find().limit(limit).skip((page - 1) * limit);
            // console.log(result);
            req.pageresult = result;
            next();
        }catch(err){
            res.statu(500).send("Error: " + err);
        }
    }
}

module.exports = fun;