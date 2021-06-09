var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')

const multer = require('multer')
const path = require('path')



var storage = multer.diskStorage({
    destination: function (req, file, cb) { // donde queres guardar las imagenes
      cb(null, path.join(__dirname, '../public/images/products/')) // para saber en la posicion del archivo en el que estoy, va path.join(__dirname 
    },
    filename: function (req, file, cb) { // como queres que se llamen las imagenes guardadas
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  }) 
   
  var upload = multer({ storage: storage }) // dentro de multer quiero que me subas el nombre del archivo y donde se guarda.

/* GET home page. */
router.get('/productAdd', productController.showProductAdd);
router.post('/productAdd', upload.single('image') ,productController.store); // nos permite guardar la imagen. El titulo y descripcion se guardan con el post
router.get('/searchResults', productController.search);
router.get('/detail/:id', productController.product);

module.exports = router;