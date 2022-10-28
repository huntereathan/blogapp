const router = require('express').Router();
const Admin = require('../model/Admin');
const admincontroller = require('../controllers/admin.controller');
const verify = require('../middleware/verifyToken');
const paginate = require('../middleware/paginate');
const User = require("../model/User")


router.get('/', verify, paginate(User), admincontroller.alluser);
router.delete('/user/:id', verify, admincontroller.userdelete);
router.delete('/article/:id', verify, admincontroller.deletearticle);

module.exports = router;