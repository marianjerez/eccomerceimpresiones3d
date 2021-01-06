//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero los modelos de Bases de Datos:
const db = require('../database/models');

function rememberMiddleware(req, res, next) {
  if(req.cookies.recordame != undefined && req.session.userLogueado == undefined) {
      let userFind;
      db.Usuarios.findOne({
        where: {
          email: req.cookies.recordame
        }
      }).then(logUser => {
        return req.session.userLogueado.email = logUser;
        });
  };
  next();
};

module.exports = rememberMiddleware;