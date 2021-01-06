module.exports = (sequelize, dataTypes) => {
  let alias = 'Producto';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncremental: true
    },
    precio : dataTypes.FLOAT,
    descripcion : dataTypes.STRING,
    // modificado de BLOB =>
    imagen : dataTypes.STRING,
    pintado : dataTypes.STRING,
    material_id : dataTypes.INTEGER,
    medida_id : dataTypes.INTEGER,
    activo: dataTypes.INTEGER
  }

  let config = {
    tablename: 'productos',
    timestamps: false
  }

  const Producto = sequelize.define(alias, cols, config);

  Producto.associate = function(models){
    Producto.belongsTo(models.Medida, { as:"medidas", foreignKey:"medida_id" });
    Producto.belongsTo(models.Material, { as:"materials", foreignKey:"material_id" });
    Producto.hasMany(models.CarritoProducto, {as:"carritoproductos", foreignKey: "productoId"});
  }

  return Producto;
}