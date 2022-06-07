/**
 * Eltávolítja a company-t az adatbázisból, res.locals.company-ben lévőt
 * Törlés után átirányít: /
 */

 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     return function(req, res, next) {
         if (typeof res.locals.company === 'undefined') {
             return next();
         }
 
         res.locals.company.remove(err => {
             if (err) {
                 return next(err);
             }
 
             return res.redirect('/');
         });
     };
 };