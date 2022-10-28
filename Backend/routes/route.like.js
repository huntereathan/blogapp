const router = require('express').Router();
const likecontroller = require('../controllers/like.controller');
const verify = require('../middleware/verifyToken');

router.post('/:id', verify, likecontroller.likearticle);
router.delete('/:id', verify, likecontroller.removelike);
router.get('/:id', verify, likecontroller.likecount);


module.exports = router;