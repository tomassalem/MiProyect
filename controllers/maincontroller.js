let productosComputacion = require('../data/data');
const db = require('../database/models');
// const op = db.Sequelize.Op
let mainController = {
    index: function (req, res){
        return res.render('index', {title: 'Tec', productosCompu: productosComputacion})
    },
    index: function(req, res){
        db.Product.findAll()
            .then( data => {
                return res.render('index', { productosCompu: data , title: 'Tec'})
            })
            .catch(error =>{
                console.log(error);
            })
    }   

}

module.exports = mainController