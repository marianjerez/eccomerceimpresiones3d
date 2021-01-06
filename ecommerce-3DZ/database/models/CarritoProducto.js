module.exports = (sequelize, dataTypes) => {
    let alias = 'CarritoProducto';
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncremental: true
      },
      precio : dataTypes.DECIMAL,
      cantidad: dataTypes.INTEGER,
      subTotal: dataTypes.INTEGER,
      estado: dataTypes.TINYINT,
      usuarioId: dataTypes.INTEGER,
      productoId: dataTypes.INTEGER,
      carritoId: dataTypes.INTEGER
    }
  
    let config = {
      tablename: 'carritoproductos',
      timestamps: false
    }
  
    const CarritoProducto = sequelize.define(alias, cols, config);
  
    CarritoProducto.closeProductState = function (idUser) {
      return sequelize.query(
        `UPDATE carritoproductos SET estado = 0 WHERE usuarioId = ${idUser} AND estado = 1`
      );
    };
  
    CarritoProducto.asignChartId = function (idUser, idCart) {
      return sequelize.query(
        `UPDATE carritoproductos SET carritoId = ${idCart} WHERE usuarioId = ${idUser} AND carritoId IS NULL`
      );
    };
  
    CarritoProducto.associate = function(models){
      CarritoProducto.belongsTo(models.Usuarios, {as: "usuario", foreignkey: "usuarioId"});
      CarritoProducto.belongsTo(models.Carrito, {as: "carrito", foreignkey: "carritoId"});
      CarritoProducto.belongsTo(models.Producto, {as: "producto", foreignkey: "productoId"});
    }
  
    return CarritoProducto;
  }