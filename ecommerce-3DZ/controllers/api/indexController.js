//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero bcrypt para encriptar las contraseñas:
//const bcrypt = require('bcrypt');

//Requiero los modelos de Bases de Datos:
const db = require('../../database/models'); 


module.exports = {
  chart: (req, res, next) => {
    let url = req.url;
    db.Carrito.findAll()
    .then((compras)=>{
      let user = req.session.userLogueado;
      let ventas = 0;
      for(compra of compras) {
        delete compra.dataValues.usuario_id;
        compra.setDataValue('endpoint', '/api/chart/' + compra.id)
        ventas += parseInt(compra.dataValues.total); 
      }
      let chartResponse = {
        meta : {
          status: 200,
          total: compras.length,
          ventas: ventas,
          url: '/api/charts'
        },
        data : compras
      }
      res.json(chartResponse);
    }).catch((e) => console.log(e));
  }
};

