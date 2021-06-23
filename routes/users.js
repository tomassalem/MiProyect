var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController')
const multer= require('multer')
const path= require('path')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});

/* GET home page. */
router.get('/register', usersController.register);
router.post('/register', upload.single('imagen'), usersController.store);
router.get('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/profile/:id', usersController.profile);
router.get('/profile-Edit', usersController.profileEdit);

module.exports = router;
