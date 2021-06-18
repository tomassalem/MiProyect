var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController')

/* GET home page. */
router.get('/register', usersController.register);
router.post('/register', usersController.store);
router.get('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/profile', usersController.profile);
router.get('/profile-Edit', usersController.profileEdit);

module.exports = router;
