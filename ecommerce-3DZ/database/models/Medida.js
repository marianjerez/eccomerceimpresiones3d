module.exports = (sequelize,dataTypes) => {
    let alias = "Medida";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
          },
        tamanios : dataTypes.STRING
    }
    let config = {
        tablename: 'medidas',
        timestamps: false
    }

    let Medida = sequelize.define(alias, cols, config);

    Medida.associate = function(models){
        Medida.hasMany(models.Producto, { as:"productos", foreignKey:"medida_id" });
    }

    return Medida;
}