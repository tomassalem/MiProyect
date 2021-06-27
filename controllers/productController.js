let productos = require('../data/data.js');
const db = require('../database/models');
const op = db.Sequelize.Op //llamamos al operador que filtra el resultado de la busqueda
let productController = {
    product: function (req, res) {
        // let detalleProducto;
        // for(let i=0; i<productos.lista.length; i++){
        //     if(req.params.id == productos.lista[i].id){
        //         detalleProducto = productos.lista[i];
        //         return res.render('product', {title: 'Tec', producto: detalleProducto})
        //     }
        // }
        let id = req.params.id;
        db.Product.findByPk(id, {
                include: [{
                        association: 'comentarios',
                        include: {
                            association: 'usuarios'
                        }
                    },
                    {
                        association: 'usuarios'
                    }
                ],
                order: [["comentarios", "createdAt", "desc"]]

            })
            .then(data => {
                return res.render('product', {
                    title: 'Tec',
                    producto: data
                })
            })


    },
    showProductAdd: function (req, res) {
        return res.render('productAdd', {
            title: 'Tec'
        })
    },
    // searchResults: function (req, res){
    //     return res.render('searchResults', {title: 'Tec',productosCompu:productos})
    // },
    search: function (req, res) {
        let info = req.query.search // agarramos lo que la persona buscó
        db.Product.findAll( // buscame todos los productos es una promesa que en algun momento se va a cumplir
                {
                    where: [{ // where = condicion
                        titulo: {
                            [op.like]: '%' + info + '%'
                        }
                    }]
                }
            )
            .then(data => { // nombre que le das a lo que antes pediste, es decir, lo que la persona buscó.
                if (data.length == 0) { // ==0 significa que cuando buscas en la base de datos no nos devuelva ningun producto
                    return res.render('searchResults', {
                        title: 'Tec',
                        productosCompu: data,
                        mensaje: 'No hay resultados para su criterio de busqueda'
                    }) // mando a la vista la data
                } else {
                    return res.render('searchResults', {
                        title: 'Tec',
                        productosCompu: data,
                        mensaje: null
                    }) // mando a la vista la data
                }
            })
    },
    store: function (req, res) { // meter en la base de datos los productos nuevos
        //Método para guardar nuevo producto.
        //1) Obtener datos, agarrar informacion del formulario
        let data = req.body; // req.body son todos los campos del formulario (nombre, descripcion, imagen)

        //2)Crear producto nuevo.
        let producto = {
            image: req.file.filename, // filename = como se llama la imagen
            titulo: data.titulo,
            usuariosId: req.session.usuarios.id, // cambiar cuando tenga login.        
            description: data.description
        }
        //3)Guardar producto
        db.Product.create(producto)
            .then((productoCreado) => {
                //4)Redirección
                return res.redirect('/');
            })
            .catch(error => {
                console.log(error);
            })
    },
    showProductEdit: function (req, res) {
        db.Product.findByPk(req.params.id)
            .then(resultado => {
                if (!resultado) {
                    res.redirect('/')
                } else if (resultado.usuariosId == req.session.usuarios.id) {
                    res.render('productEdit', {
                        producto: resultado
                    })
                } else{
                    res.redirect('/')
                }

            })

    },
    updateProductEdit: function (req, res) {
        let data = req.body; // req.body son todos los campos del formulario (nombre, descripcion, imagen)

        //2)Crear producto nueva.
        let producto = {
            image: req.file.filename, // filename = como se llama la imagen
            titulo: data.titulo,
            usuariosId: req.session.usuario, // cambiar cuando tenga login.        
            description: data.description
        }
        //3)Guardar producto
        db.Product.update(producto, {
                where: {
                    id: req.body.id
                }
            })
            .then((productoUpdateado) => {
                //4)Redirección
                return res.redirect('/product/detail/' + req.body.id);
            })
    },
    comment: function (req, res) {
        let data = req.body;
        if(req.session.usuarios){
            let comentario = {
                tablaproductosId: data.idProduct,
                usuariosId: req.session.usuarios.id,
                texto: data.texto
            }
            //3)Guardar producto
            db.Comment.create(comentario)
                .then(() => {
                    //4)Redirección
                    return res.redirect('/product/detail/'+req.body.idProduct);
                })
                .catch(error => {
                    console.log(error);
                })

        }else{
            res.redirect("/users/login")
        }

        //2)Crear comentario nuevo.
    },
    delete: (req, res)=>{
        db.Product.destroy({
            where: {
                id: req.body.id
            }
        }) .then(()=>res.redirect("/"))
    }

}

module.exports = productController