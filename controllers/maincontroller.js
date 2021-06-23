let productosComputacion = require('../data/data');
const db = require('../database/models');
// const op = db.Sequelize.Op
let mainController = {
    // index: function (req, res){
    //     return res.render('index', {title: 'Tec', productosCompu: productosComputacion})
    // },
    index: function(req, res){
        db.Product.findAll({
            order: [
                ['createdAt' , 'DESC'],
            ],
            include: [
                {association: 'usuarios'}
            ]
        }) // pido los productos
            .then( data => { // nombre que le das a lo que acabas de pedir, el resultado de la linea de arriba.
                return res.render('index', {title: 'Tec', productosCompu: data}) // mando a la vista la data
            })
    }   

}

module.exports = mainController