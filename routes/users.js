var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController')

/* GET home page. */
router.get('/', usersController.profile);
router.get('/register', usersController.register);
router.get('/login', usersController.login);
router.get('/profileEdit', usersController.profileEdit);

module.exports = router;
