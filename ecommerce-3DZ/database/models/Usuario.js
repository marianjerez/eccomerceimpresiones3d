module.exports = (sequelize, dataTypes) => {
  let alias = 'Usuarios';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncremental: true
    },
    activo: {
       type: dataTypes.INTEGER
    },
    admin: {
       type: dataTypes.INTEGER
    },
    nombreApellido: { 
      type: dataTypes.STRING
    },
    email: {
      type: dataTypes.STRING
    },
    password: {
      type: dataTypes.STRING
    },
    telefono: {
      type: dataTypes.INTEGER
    },
    domicilio: {
      type: dataTypes.STRING
    },
    localidad: {
      type: dataTypes.STRING
    },
  }

  let config = {
    tablename: 'usuarios',
    timestamps: false
  }

  const Usuario = sequelize.define(alias, cols, config);
  Usuario.associate = function(models){
    Usuario.hasMany(models.Carrito, { as:"carrito", foreignKey:"usuario_id" });
    Usuario.hasMany(models.CarritoProducto, {as:"carritoproductos", foreignKey: "usuarioId"});
  }
  return Usuario;
}