module.exports = function(sequelize, dataTypes){

    //Definir un alias.
    let alias = 'User'; //Con este alias sequelize va a identificar internamente al archivo de modelo.

    //Describir la configuración de las columnas de la tabla
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        createdAt:{
            type: dataTypes.DATE,
            allowNull:true,
        },
        updatedAt:{
            type: dataTypes.DATE,
            allowNull:true,
        },
        nombre:{
            type: dataTypes.STRING,
        },
        apellido:{
            type: dataTypes.STRING,
        },
        nombreusuario:{
            type: dataTypes.STRING,
        },
        fechanacimiento:{
            type: dataTypes.DATE,
        },
        telefono:{
            type: dataTypes.STRING,
        },
        email:{
            type: dataTypes.STRING,
        },
        password: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: 'usuarios', 
        timestamps: true, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const User = sequelize.define(alias, cols, config);
   User.associate = function(models){
       User.hasMany(models.Product,{
           as: 'tablaproductos', //como voy a llamar a la relacion dentro del controlador
           foreignKey: 'usuariosId'
       })
   },
   User.associate = function(models){
       User.hasMany(models.Comment,{
           as: 'comentarios', //como la voy a llamar en el controlador
           foreignKey: 'usuariosId'
       })
   }


   return User;
}