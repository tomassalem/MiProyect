let productosComputacion = require('../data/data');
let usersController = {
    profile: function (req, res){
        return res.render('profile', {title: 'Tec', productosCompu: productosComputacion})
    },
    register: function (req, res){
        return res.render('register', {title: 'Tec'})
    },
    login: function (req, res){
        return res.render('login', {title: 'Tec'})
    },
    profileEdit: function (req, res){
        return res.render('profile-Edit', {title: 'Tec'})
    }
}

module.exports = usersController