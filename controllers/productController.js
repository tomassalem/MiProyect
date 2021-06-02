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
        return res.render('searchResults', {title: 'Tec',productosCompu:productos})
    },
    create: function(req, res){
        //Mostrar formulario de carga de productos
        db.User.findAll()
            .then( data => {
                return res.render('', {users:data});
            })
            .catch(error => {
                console.log(error);
            })
    },
    store: function(req, res){
        //Método para guardar nueva película.
        //1) Obtener datos del formulario
        let data = req.body;

        //2)Crear pelicula nueva.
        let producto = {
            titulo: data.titulo,            
            description: data.description,
            image: data.image
        }
        //3)Guardar película
        db.Product.create(producto)
            .then( (productoCreado) => {
        //4)Redirección
                return res.redirect('/');
            })
            .catch(error => {
                console.log(error);
            })
    },
    
}

module.exports = productController

