module.exports = (req, res, next) => {
    if (!req.session.userLogueado) {
       return res.redirect('/users/login');
    }
 
    return next();
 }