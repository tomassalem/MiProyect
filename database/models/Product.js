module.exports = function(sequelize, dataTypes){

    //Definir un alias.
    let alias = 'Product'; //Con este alias sequelize va a identificar internamente al archivo de modelo.

    //Describir la configuración de las columnas de la tabla
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        image:{
            type: dataTypes.STRING,
        },
        titulo:{
            type: dataTypes.STRING,
        },
        usuariosId:{
            type: dataTypes.INTEGER
        },
        description:{
            type: dataTypes.STRING,
        },
        createdAt:{
            type: dataTypes.STRING,
        }




    }

    let config = {
        tableName: 'tablaproductos', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const Product = sequelize.define(alias, cols, config);

   return Product;
}