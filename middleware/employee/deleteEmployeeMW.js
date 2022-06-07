/**
 * Eltávolítja az employee-t az adatbázisból, res.locals.employee-ben lévőt
 * Törlés után átirányít: /employee/:companyid 
 */

 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     return function(req, res, next) {
         if (typeof res.locals.employee === 'undefined') {
             return next();
         }
 
         res.locals.employee.remove(err => {
             if (err) {
                 return next(err);
             }
             return res.redirect(`/employee/${res.locals.company._id}`);
         });
     };
 };