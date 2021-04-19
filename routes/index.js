var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');
const { route } = require('./product');

/* GET home page. */
router.get('/', mainController.index);
router.get('/headerLogueado', mainController.headerLogueado);

module.exports = router;



//app->router->controlador->view