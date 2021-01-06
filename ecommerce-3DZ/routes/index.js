var express = require('express');
var router = express.Router();

//Requiero los controladores:
var indexController = require('../controllers/indexController');
var usersController = require('../controllers/usersController');
var productsController = require('../controllers/productsController');

//Requiero los middlewares:
var logMiddleware = require('../middlewares/logMiddleware');
var indexMiddleware = require('../middlewares/indexMiddleware');
var usersMiddleware = require('../middlewares/usersMiddleware');

/* GET home page. */
router.get('/', indexController.homePage);

/* GET Error page. */
router.get('/deniedAcces', function(req, res, next) {
  res.render('deniedAcces', { title: 'Acceso Denegado' });
});

/* GET Modelado page. 
router.get('/modelado',indexController.modelado);*/

/* GET Admin page. */
router.get('/admin', usersMiddleware.adminAccess, indexController.admin);


//Cierre Session:

router.get('/logout', usersController.checkout);

/* GET nosotros page. */
router.get('/nosotros',indexController.nosotros);

/* GET contacto page. */
router.get('/contacto',indexController.contacto);

router.get('/header', (req, res) => {
  res.render('partials/headerTest');
})
//-----------------------Ruta al carrito:-------------------

router.get('/chart', logMiddleware, usersController.carrito);
router.post('/addToCart', logMiddleware, usersController.addToCart);
router.post('/deleteFromChart', logMiddleware, usersController.deleteFromChart);
router.post('/purchase',logMiddleware, usersController.purchase);
router.get('/buyHistory',logMiddleware, usersController.buyHistory);
router.post('/sumarUnProducto',logMiddleware, usersController.sumarUno);
router.post('/restarUnProducto',logMiddleware, usersController.restarUno);

//Ruta a activar producto:
//router.post('/products/activate/:id', productsController.activate);




module.exports = router;
