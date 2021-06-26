var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session'); //Instalamos session.

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
  { secret:'productoscompu',
    resave: false,
    saveUninitialized: true }
));



app.use(function(req, res, next){
  if(req.session.usuarios != undefined){
    res.locals.usuarios = req.session.usuarios;
    return next();
  } 
  return next(); //Clave para que el proceso siga adelante.  
})

//Gestionar la cookie.
app.use(function(req, res, next){
  //Solo quiero hacerlo si tengo una cookie
  if(req.cookies.userId != undefined && req.session.user == undefined){
    let idDeLaCookie = req.cookies.userId;
    
    db.User.findByPk(idDeLaCookie)
    .then( user => {
      req.session.usuarios = user; //Estamos poniendo en session a toda la instancia del modelo. Debería ser solo user.dataValues.
      res.locals.usuarios = user; //Se corrije si usamos user.dataValues
      return next();
    })
    .catch( e => {console.log(e)})
  } else {
    //Si no tengo cookie quiero que el programa continue
    return next();
  }

})

app.use(function(req, res, next) {
  if(req.session.usuarios){
    res.locals = {
      log: true,
      usuarios: req.session.usuarios,
    }
  } else {
    res.locals = {
      log: false
    }
  }

	return next();
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler


module.exports = app;
