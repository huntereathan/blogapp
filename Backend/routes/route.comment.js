const router = require('express').Router();
const commentcontroller = require('../controllers/comment.controller');
const verify = require('../middleware/verifyToken')

router.get('/:id', commentcontroller.getcommentbyid);
router.post('/:id', verify, commentcontroller.postnewcomment);
router.delete("/:id", verify, commentcontroller.deletecomment)

module.exports = router;
