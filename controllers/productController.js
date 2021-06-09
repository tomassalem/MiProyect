let productos = require('../data/data.js');
const db = require('../database/models');
let productController = {
    product: function (req, res){
        // let detalleProducto;
        // for(let i=0; i<productos.lista.length; i++){
        //     if(req.params.id == productos.lista[i].id){
        //         detalleProducto = productos.lista[i];
        //         return res.render('product', {title: 'Tec', producto: detalleProducto})
        //     }
        // }
        db.Product.findByPk(req.params.id)
        .then(data => {
            return res.render('product', {title: 'Tec', producto: data})
        })
        .catch(error =>{
            console.log(error);
        })
    },
    showProductAdd: function (req, res){
        return res.render('productAdd', {title: 'Tec'})
    },
    searchResults: function (req, res){
        return res.render('searchResults', {title: 'Tec',productosCompu:productos})
    },
    store: function(req, res){ // meter en la base de datos los productos nuevos
        //Método para guardar nuevo producto.
        //1) Obtener datos, agarrar informacion del formulario
        let data = req.body; // req.body son todos los campos del formulario (nombre, descripcion, imagen)

        //2)Crear pelicula nueva.
        let producto = {
            image: req.file.filename, // filename = como se llama la imagen
            titulo: data.titulo,    
            usuariosId: 1, // cambiar cuando tenga login.        
            description: data.description
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
    showProductEdit: function(req, res){
        db.Product.findByPk(req.params.id)
        .then(resultado => {
            res.render('productEdit', {
                producto: resultado
            })

        })
        
    },
    updateProductEdit: function(req, res){
        let data = req.body; // req.body son todos los campos del formulario (nombre, descripcion, imagen)

        //2)Crear pelicula nueva.
        let producto = {
            image: req.file.filename, // filename = como se llama la imagen
            titulo: data.titulo,    
            usuariosId: 1, // cambiar cuando tenga login.        
            description: data.description
        }
        //3)Guardar película
        db.Product.update(producto, {
            where:{
                id:req.body.id
            }
        })
            .then( (productoUpdateado) => {
        //4)Redirección
                return res.redirect('/product/detail/'+req.body.id);
            })
            .catch(error => {
                console.log(error);
            })
    }

}

module.exports = productController

