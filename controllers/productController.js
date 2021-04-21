let productos = require('../data/data.js');
let productController = {
    product: function (req, res){
        let detalleProducto;
        for(let i=0; i<productos.lista.length; i++){
            if(req.params.id == productos.lista[i].id){
                detalleProducto = productos.lista[i];
                return res.render('product', {title: 'Tec', producto: detalleProducto})
            }
        }
        
    },
    productAdd: function (req, res){
        return res.render('productAdd', {title: 'Tec'})
    },
    searchResults: function (req, res){
        return res.render('searchResults', {title: 'Tec'})
    }
    
}

module.exports = productController

