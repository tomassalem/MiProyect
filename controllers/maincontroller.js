let productosComputacion = require('../data/data');
let mainController = {
    index: function (req, res){
        return res.render('index', {title: 'Tec', productosCompu: productosComputacion})
    },
    headerLogueado: function (req, res){
        return res.render('index', {title: 'Tec'})
    }

}

module.exports = mainController