const router = require('express').Router();
const Article = require('../model/Articles');
const articlecontroller = require('../controllers/article.controller');
const verify = require('../middleware/verifyToken');
const paginate = require('../middleware/paginate');

router.get('/', paginate(Article), articlecontroller.allarticle);
router.get('/user/:id', articlecontroller.articlebyuser);
// To get specific articles of the logged user
router.get('/userspecific', verify, articlecontroller.userarticle);
router.get('/:id', articlecontroller.articlebyid);
router.post('/', verify, articlecontroller.createNewArticle);
router.put('/:id', verify, articlecontroller.updateArticle);
router.delete('/:id', verify, articlecontroller.deleteArticle);
router.delete('/', verify, articlecontroller.deletemultiplearticle);




module.exports = router;