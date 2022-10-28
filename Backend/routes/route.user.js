const router = require('express').Router();
// const User = require('../model/User');
const usercontroller = require('../controllers/user.controller');
const verify  = require('../middleware/verifyToken');

router.get("/folcount", verify, usercontroller.followcount);
router.get('/:id', usercontroller.userInformation);
router.put("/follow", verify, usercontroller.userfollow);
router.put("/unfollow", verify, usercontroller.userunfollow);
router.put('/:id', verify, usercontroller.userUpdate);
router.delete('/:id', verify, usercontroller.deleteUser);



module.exports = router;
