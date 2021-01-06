module.exports = (sequelize,dataTypes) => {
    let alias = "Material";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
          },
        tipomaterial : dataTypes.STRING
    }
    let config = {
        tablename: 'materials',
        timestamps: false
    }

    let Material = sequelize.define(alias, cols, config);

    Material.associate = function(models){
        Material.hasMany(models.Producto, { as:"productos", foreignKey:"material_id" });
    }

    return Material;
}