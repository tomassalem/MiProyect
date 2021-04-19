var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')

/* GET home page. */

router.get('/', productController.product);
router.get('/productAdd', productController.productAdd);
router.get('/searchResults', productController.searchResults);
router.get('/detail/:id', productController.getDetail);

module.exports = router;