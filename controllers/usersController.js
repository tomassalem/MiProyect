let productosComputacion = require('../data/data');
const bcrypt= require('bcryptjs');
const db = require('../database/models');


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
            return res.redirect("/")
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
            if(usuarios && bcrypt.compareSync(req.body.password, usuarios.password)){

            req.session.usuarios= usuarios;
        if(req.body.remember){
            res.cookie("userId", usuarios.id, {
                maxAge: 1000*60*5
            })
        }
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
        db.User.findByPk(req.params.id) 
        .then(resultado=>{
            if (!resultado) {
                res.redirect('/')
            } else if (resultado.id == req.session.usuarios.id) {
            return res.render('profile-Edit', {title: 'Tec', resultado: resultado, error: null})
            } else {
                res.redirect('/')
            }
        })

    },
    logout: function(req, res){
        //tenemos que destruir la sesion 
        req.session.destroy();

        //si hay una cookie hay que eliminar la cookie
        res.clearCookie("userId")

        //hay que redireccionar a home
        return res.redirect('/')
    },
    update: (req, res)=>{
        console.log("ESTE ES EL ID" + req.body.id)
        db.User.findByPk(req.body.id) 
        .then(resultado=>{
            //if (!req.body.nombre || !req.body.apellido || !req.body.telefono || !req.body.nombreusuario){
            //    return res.render('profile-Edit', {title: 'Tec', resultado: resultado, error: "No pueden haber campos vacíos"})

            //}
            if(req.body.password){
                db.User.update({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    nombreusuario: req.body.nombreusuario,
                    telefono: req.body.telefono,
                    password: bcrypt.hashSync(req.body.password, 10),
                },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then(usuario=>{
                    req.session.usuario=usuario
                    res.redirect("/users/profile/" + req.body.id)

                })
            }else{
                db.User.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nombreusuario: req.body.nombreusuario,
                telefono: req.body.telefono,
            },
            {
                where: {
                    id: req.body.id
                }
            })
            .then(usuario=>{
                req.session.usuario=usuario
                res.redirect("/users/profile/" + req.body.id)
            })

            }
        })
        
    }
}

module.exports = usersController