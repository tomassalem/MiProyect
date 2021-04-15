var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')

/* GET home page. */

router.get('/', productController.product);
router.get('/product-add', productController.product-add);
router.get('/product-edit', productController.product-edit);
router.get('/searchResults', productController.searchResults);
var express = require('express');
var router = express.Router();





module.exports = router;