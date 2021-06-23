let productosComputacion = require('../data/data');
const bcrypt= require('bcryptjs');
const db = require('../database/models');
const usuarios= db.User


const op = db.Sequelize.Op
let usersController = {
    profile: function (req, res){


        db.User.findByPk(req.params.id, {
            include: [{
                association: 'tablaproductos'
            }]
            })
        .then(data =>{
            return res.render('profile', {title: 'Tec', usuario: data})
        })
    },
    register: function (req, res){
        
        return res.render('register', {title: 'Tec'})
    },
    store: function (req, res){
        //guardar un usuario en la db
        let usuarios = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            nombreusuario: req.body.nombreusuario,
            fechanacimiento: req.body.fechaNacimiento,
            telefono: req.body.telefono,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.file.filename
        }
        db.User.create(usuarios)
        .then( user =>{
            return res.redirect('/users/login')
        })
        .catch(e => {console.log(e)});

    },
    login: function (req, res){
         //buscar el usuario que se quiere loguear
         db.usuarios.findOne({
            where: [{email: req.body.email}]
        })
        .then(usuarios => {
            req.session.usuarios= user;
            return res.redirect('/');
        })
        .catch(e => {console.log(e)})
    
        
    },
    profileEdit: function (req, res){
        return res.render('profile-Edit', {title: 'Tec'})
    },
    logout: function(req, res){
        //tenemos que destruir la sesion 
        req.session.destroy();

        //si hay una cookie hay que eliminar la cookie

        //hay que redireccionar a home
        return res.redirect('/')
    }
}

module.exports = usersController