var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController')

/* GET home page. */
router.get('/', mainController.index);
router.get('/product', mainController.products);
router.get('/search-results', mainController.search-results);
router.get('/headerLogueado', mainController.headerLogueado);


module.exports = router;



//app->router->controlador->view