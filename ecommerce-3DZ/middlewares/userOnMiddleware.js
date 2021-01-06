module.exports = (req, res, next) => {
    if (req.session.userLogueado) {
       return res.redirect('/');
    }
 
    return next();
 }