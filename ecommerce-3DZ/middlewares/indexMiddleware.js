//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero bcrypt para encriptar las contraseñas:
const bcrypt = require('bcrypt');

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');

//Requiero los modelos de Bases de Datos:
const db = require('../database/models'); 


const indexMiddleware = {
  adminAccess: (req, res, next) => {
    let user = req.session.userLogueado;
    if(user == undefined) {
      res.render('users/login', {errors: [{msg: 'ACCESO DENEGADO. Debe estar logueado y poseer permisos de administración'}]});
    } else {     
    if (user.admin == 0) {
      res.send('ACCESO DENEGADO. No posee los permisos necesarios para poder acceder a la pagina solicitada.');
  }}
    next();
  }  
};

module.exports = indexMiddleware;