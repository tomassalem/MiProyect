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
        if(req.session.usuarios){
            res.redirect("/")
        }else {
            return res.render('register', {title: 'Tec', error: null})

        }
        
    },
    store: function (req, res){
        //guardar un usuario en la db
        if(!req.body.nombre || !req.body.apellido || !req.body.nombreusuario || !req.body.fechaNacimiento || !req.body.telefono || !req.body.email || !req.body.password || !req.file){
            return res.render('register', {title: 'Tec', error: "No pueden haber campos vacíos"})
        }
        if (req.body.password.length<3){
            return res.render('register', {title: 'Tec', error: "La contraseña debe tener al menos tres caracteres"})

        }
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(resultado=> {
            if(!resultado) {

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
            }else{
                return res.render('register', {title: 'Tec', error: "Ya hay un usuario registrado con ese email"})

            }
        })

    },
    login: function (req, res){
         //buscar el usuario que se quiere loguear
         if(req.session.usuarios){
             res.redirect("/")
         }else {
            res.render("login", {
                error: null
            })
         }
    
        
    },
    loginPost: function(req, res) {
        if (!req.body.user || !req.body.password){
            res.render("login", {
                error: "No puede haber ningún campo vacío"
            })
        }
        db.User.findOne({
            where: [{email: req.body.user}]
        })
        .then(usuarios => {
            let contra = req.body.password
            let pass = usuarios.password
            if(usuarios && bcrypt.compareSync(contra, pass)){

            req.session.usuarios= usuarios;
            return res.redirect('/');
        } else{
            res.render("login", {
                error: "El usuario o contraseña son incorrectos"
            })
        }
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
        res.clearCookie("userId")

        //hay que redireccionar a home
        return res.redirect('/')
    }
}

module.exports = usersController