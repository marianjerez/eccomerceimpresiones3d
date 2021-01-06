module.exports = (sequelize, dataTypes) => {
    let alias = 'Carrito';
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncremental: true
      },
      createdAt : dataTypes.DATE,
      updatedAt : dataTypes.DATE,
      orderNumber : dataTypes.INTEGER,
      total : dataTypes.INTEGER,
      usuario_id : dataTypes.INTEGER
    }
  
    let config = {
      tablename: 'carritos',
      timestamps: true
    }
  
    const Carrito = sequelize.define(alias, cols, config);
  
    Carrito.associate = function(models){
      Carrito.belongsTo(models.Usuarios, { as:"usuarios", foreignKey:"usuario_id" });
      Carrito.hasMany(models.CarritoProducto, {as:"carritoproductos", foreignKey: "carritoId"});
    }
  
    return Carrito;
  }