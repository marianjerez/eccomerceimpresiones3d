const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Requiero Express-Validator para validar los datos de los formularios:
var{check, validationResult, body} = require('express-validator');


//Requiero la Base de Datos:

const productsController = {
    vistaProducto : function(req,res,next){
        db.Producto.findAll({
            include : [{association:"medidas"},{association:"materials"}]
        })
            .then(function(productos){
                let user = req.session.userLogueado;
                res.render('products/products',{productos:productos, user});
            })
    },
    search : function(req,res,next){
        let x = req.body.search;
 
        db.Producto.findAll({
            where: { descripcion: {[db.Sequelize.Op.like]: '%' + x + '%'} },
            include : [{association:"medidas"},{association:"materials"}]
        }).then(function(productos){
            let user = req.session.userLogueado;
            res.render('products/products', {productos, user})
        }).catch((err) => {console.log(err)});
    },
    id : function(req,res,next){
        db.Producto.findByPk(req.params.id)
        .then((producto) =>{
            if (producto){
                let user = req.session.userLogueado;
                res.render('products/productDetail', {producto, user});
            } else {
                res.redirect('/products');
            }
        }).catch(err => {console.log(err)})
    },
    create : function(req,res,next){
        let promesaMedidas = db.Medida.findAll();
        let promesaMaterial = db.Material.findAll();

        Promise.all([promesaMedidas, promesaMaterial])
            .then(([medidas,materials]) =>{
                res.render('products/create', {medidas:medidas,materials:materials});
            })
    },
    store : function(req, res, next) {
        let user = req.session.userLogueado;
        db.Producto.create({
            descripcion: req.body.name,
            precio: Number(req.body.price),
            // LA SIG. MANERA (COMENTADA) GUARDA EL ARCHIVO EN RESOURCES Y LUEGO LO LEE CON FS, ALMACENANDOLO EN LA DB COMO UN BLOB:
            // (EN PHPMYADMIN LA COLUMNA IMAGEN DEBE ESTAR SETIADO COMO BLOB TAMBIEN)
            // imagen : fs.readFileSync(__dirname + "/../resources/uploads/" + req.files[0].filename),
            imagen : path.normalize("/uploads/" + req.files[0].filename),
            pintado : req.body.pintado,
            material_id : req.body.Material,
            medida_id : req.body.dimension
        }).then(()=>{
            res.redirect('/products');
        }).catch((err) => { console.log(err) })
    },
    edit : function(req,res,next){
        let promesaProducto = db.Producto.findByPk(req.params.id,{
            include : [{association:"medidas"},{association:"materials"}]
        });
        let promesaMedidas = db.Medida.findAll();
        let promesaMaterial = db.Material.findAll();

        Promise.all([promesaMedidas, promesaMaterial, promesaProducto])
            .then(([medidas,materials,producto]) =>{
                res.render('products/edit', {medidas:medidas,materials:materials, producto:producto});
            }).catch((err) => {console.log(err)})
    },
    update : function(req,res,next){
        //Capturo los errores del formulario y analizo su existencia:
        let errors = (validationResult(req));
        // Continuo con las validaciones:
        if(errors.isEmpty()) {
        db.Producto.findByPk(req.params.id)
            .then((producto) =>{
                let toUpdate = req.body;
                toUpdate.descripcion = req.body.name;
                toUpdate.precio = Number(req.body.price);
                toUpdate.imagen = req.files[0] != undefined ? path.normalize("/uploads/" + req.files[0].filename) : producto.imagen,
                toUpdate.pintado = req.body.pintado;
                toUpdate.material_id = req.body.Material;
                toUpdate.medida_id = req.body.dimension;
                return db.Producto.update(toUpdate,{
                    where: {
                        id : req.params.id
                    }
                })
            }).then(()=>{
                res.redirect('/products/listado');
            }).catch((err) => { console.log(err) })
        } else {
            let promesaProducto = db.Producto.findByPk(req.params.id,{
                include : [{association:"medidas"},{association:"materials"}]
            });
            let promesaMedidas = db.Medida.findAll();
            let promesaMaterial = db.Material.findAll();
    
            Promise.all([promesaMedidas, promesaMaterial, promesaProducto])
                .then(([medidas,materials,producto]) =>{
                    res.render('products/edit', {medidas:medidas,materials:materials, producto:producto, errors: errors.errors});
                }).catch((err) => {console.log(err)})
        };
    },
    destroy : function(req,res,next){
       //Modificando el campo activo:
       let url = req.url;
       let user = req.session.userLogueado;    
       db.Producto.update({
        activo: 0,
      }, {
        where: {
          id: req.params.id
        }
      }).then(() =>{
        res.redirect('/products/listado')
      }).catch((err) => { console.log(err) });
      //res.render('products/productsList', {user, url});
    },
    activate: function(req,res,next){
        let url = req.url;
        let user = req.session.userLogueado;
        //Modificando el campo activo:
        db.Producto.update({
         activo: 1,
       }, {
         where: {
           id: req.params.id
         }
       }).then(()=>{
        res.redirect('/products/listado');
       }).catch((err) => { console.log(err) });
       //res.render('products/productsList', {user, url});
     },
    list: (req, res, next) => {
        let url = req.url;
        db.Producto.findAll()
        .then((productos) => {
          let user = req.session.userLogueado;
          res.render('products/productsList', {productos: productos, user, url})
        }).catch((err) => { console.log(err) });
    },
};

module.exports = productsController;