module.exports = function(sequelize, dataTypes){

    //Definir un alias.
    let alias = 'Comment'; //Con este alias sequelize va a identificar internamente al archivo de modelo.

    //Describir la configuración de las columnas de la tabla
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        tablaproductosId:{
            type: dataTypes.INTEGER,
        },
        usuariosId:{
            type: dataTypes.INTEGER,
        },
        texto:{
            type: dataTypes.STRING,
        },
        createdAt:{
            type: dataTypes.DATE,
        },
        updatedAt:{
            type: dataTypes.DATE,
        }
    }

    let config = {
        tableName: 'comentarios', 
        timestamps: true, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const Comment = sequelize.define(alias, cols, config);
   Comment.associate = function(models){
    Comment.belongsTo(models.User,{
        as: 'usuarios',
        foreignKey: 'usuariosId'
    })
}

   return Comment;
}