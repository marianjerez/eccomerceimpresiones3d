var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

/* GET products listing. */
const productsController = require('../controllers/productsController');

var usersMiddleware = require('../middlewares/usersMiddleware');

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');
const productsMiddleware = require('../middlewares/productsMiddleware');


/*MULTER y Path. Luego de aplicar upload.any() a la ruta que lo necesite configuramos en el controller el objeto para tomar la imagen*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
   
var upload = multer({ storage: storage });

//Ruta a Listado Productos:

router.get('/listado', usersMiddleware.adminAccess, productsController.list);

//Ruta a activar producto:
router.post('/activate/:id', productsController.activate);

/*CLASICO AMB:*/
/* DAR DE ALTA*/
router.get('/create', usersMiddleware.adminAccess, productsController.create);
router.post('/create', upload.any(), productsMiddleware.validar, productsController.store);

/* DAR DE BAJA*/
router.get('/destroy/:id', usersMiddleware.adminAccess,productsController.destroy);

/* MODIFICAR*/
router.get('/edit/:id', usersMiddleware.adminAccess,productsController.edit);
router.post('/edit/:id', upload.any(), productsMiddleware.validar, productsController.update);

/*VER - 
PONGO POR ULTIMO PORQUE EJECUTA DESDE ARRIBA HACIA ABAJO, SI TOMO UNA RUTA MUY GENERAL LA EJECUTA PRIMERO Y ARRUINA LO QUE ESTE MAS ABAJO*/
/* GET Formulario page. */
router.get('/',productsController.vistaProducto);
router.post('/',productsController.search);
router.get('/:id',productsController.id);

//Ruta a carrito:
//router.get('/carrito', productsController.carrito);



//Ruta a activar producto:
router.post('/activate/:id', productsController.activate);
module.exports = router;