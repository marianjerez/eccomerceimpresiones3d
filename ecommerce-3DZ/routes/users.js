var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
var usersMiddleware = require('../middlewares/usersMiddleware');

//Requiero path y fs para trabajar con archivos:
const path = require('path');
const fs = require('fs');

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');

//Requiero los modelos de Bases de Datos:
const db = require('../database/models');

// Rutas a  LogIn:
router.get('/login', usersMiddleware.guest, usersController.logIn);

router.post('/login', usersMiddleware.login, usersController.processLogin);

// Rutas a Registro Usuario:
router.get('/register', usersMiddleware.guest ,usersController.register);
router.post('/register', usersMiddleware.register, usersController.create);

//Rutas a Cambio de Contraseña:
router.get('/newPass', usersController.newPass);
router.post('/newPass', usersMiddleware.newpass , usersController.updateNewPass);

//Ruta a Listado Usuarios:

router.get('/listado', usersMiddleware.adminAccess, usersController.list);

/* GET Error page. */
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'error' });
});

//Ruta a Detalle de Usuario:

router.get('/:id', usersMiddleware.log, usersMiddleware.edit, usersController.detail);

//Ruta a Actualización de Datos Usuario:

router.get('/edit/:id', usersMiddleware.log, usersMiddleware.edit, usersController.edit);
router.post('/edit/:id',  usersMiddleware.store, usersController.update);

//Ruta a Eliminar usuario:
router.post('/destroy/:id', usersController.destroy);

//Ruta a activar usuario:
router.post('/activate/:id', usersController.activate);

//Ruta a cambiar permisos:
router.post('/permission/:id', usersController.permission);

//Eliminar Session:

router.post('/checkout/', usersController.checkout);


//Ruta al carrito:

module.exports = router;
