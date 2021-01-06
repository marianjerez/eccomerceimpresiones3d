const indexController = {
  homePage: function(req, res, next) {
    let user = req.session.userLogueado;
    res.render('index', { title: 'Bienvenidos a 3DZ impresiones', user});
  },
  formulario: function(req, res, next) {
    res.render('formularioProductos', { title: 'Formulario de productos' });
  },
  modelado: function (req,res,next){
    let user = req.session.userLogueado;
    res.render('modelado',{title: 'Formulario de Servicio de modelado', user})
  },
  admin: (req, res, next) => {
    let url = req.url;
    let user = req.session.userLogueado;
    res.render('admin',{title: 'Administración del Sitio 3DZ', user, url})
  },
  nosotros: function (req,res,next){
    let user = req.session.userLogueado;
    res.render('nosotros',{title: 'nosotros', user})
  },
  contacto: function (req,res,next){
    let user = req.session.userLogueado;
    res.render('contacto',{title: 'contacto', user})
  }
}


module.exports = indexController;