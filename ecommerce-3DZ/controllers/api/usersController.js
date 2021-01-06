//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero bcrypt para encriptar las contraseñas:
//const bcrypt = require('bcrypt');

//Requiero los modelos de Bases de Datos:
const db = require('../../database/models'); 


const usersController = {
  list: (req, res, next) => {
    let url = req.url;
    db.Usuarios.findAll({
      where: {
        admin: 0,
        activo: 1
      }
   })
    .then((usuarios) => {
      let user = req.session.userLogueado;
      for (usuario of usuarios) {
        usuario.setDataValue('endpoint', '/api/users/' + usuario.id);
        //Elimino campos que no quiero enviar a la API:
        delete usuario.dataValues.admin;
        delete usuario.dataValues.password;
        delete usuario.dataValues.telefono;
        delete usuario.dataValues.domicilio;
      }
            
      let usersResponse = {
        meta : {
          status: 200,
          total: usuarios.length,
          url: '/api/users'
        },
        data : usuarios
      }
      res.json(usersResponse);
    }).catch((err) => { console.log(err) });
  },
  detail: (req, res, next) => {
    db.Usuarios.findByPk(req.params.id)
      .then((usuario) => {
        userId = req.params.id;
        //Elimino campos que no quiero enviar a la API:
        delete usuario.dataValues.password;
        res.json(usuario);
      })
  }
};

module.exports = usersController;