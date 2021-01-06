//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero los modelos de Bases de Datos:
const db = require('../../database/models'); 

const productsController = {
  list: (req, res, next) => {
    let url = req.url;
    db.Producto.findAll({
      where: {
        activo: 1
      },
      include : [{association:"medidas"},{association:"materials"}]
   })
    .then((productos) => {
      let user = req.session.userLogueado;
      for (producto of productos) {
        //Elimino campos que no quiero enviar a la API:
        delete producto.dataValues.material_id;
        delete producto.dataValues.medida_id;
        delete producto.dataValues.activo;
        producto.setDataValue('endpoint', '/api/products/' + producto.id)
      }
      let productsResponse = {
        meta : {
          status: 200,
          total: productos.length,
          url: '/api/products'
        },
        data : productos
      }
      //si quiero el material del producto:
      //console.log(productsResponse.data[0].materials.dataValues.tipomaterial);
      res.json(productsResponse);
    }).catch((err) => { console.log(err) });
  },
  detail : function(req,res,next){
    db.Producto.findByPk(req.params.id,{
      include : [{association:"medidas"},{association:"materials"}]
    })
    .then((producto) =>{
      res.json(producto)
    }).catch(err => {console.log(err)})
  },
  materiales : function(req,res,next){
    db.Material.findAll()
      .then((materiales) => {
        console.log(materiales);
        res.json(materiales);
      })
      .catch(err => {console.log(err)})
  },
  lastOne : function(req,res,next){
    db.Producto.findOne({
      where : {
        activo : 1
      },
      order: [["id", "DESC"]]
    }).then((producto)=>{
        res.json(producto);
    })
    .catch(err => {console.log(err)})
  }
};

module.exports = productsController;