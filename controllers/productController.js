let productos = require('../data/data.js');
const db = require('../database/models');
const op = db.Sequelize.Op
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
    // searchResults: function (req, res){
    //     return res.render('searchResults', {title: 'Tec',productosCompu:productos})
    // },
    search: function(req, res){
        let info = req.query.search // agarramos lo que la persona buscó
        db.Product.findAll( // buscame todos los productos es una promesa que en algun momento se va a cumplir
            {
                where: [{ // where = condicion
                    titulo: {[op.like]:'%'+info+'%'} 
                }]
            }

        )
            .then( data => { // nombre que le das a lo que antes pediste, es decir, lo que la persona buscó.
                return res.render('searchResults', {title: 'Tec', productosCompu: data}) // mando a la vista la data
            })
            .catch(error =>{
                console.log(error);
            })
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
    
}

module.exports = productController

