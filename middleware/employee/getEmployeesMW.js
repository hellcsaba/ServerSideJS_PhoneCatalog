/**
 * Betölti az összes employee-t az adatbázisból
 * Az eredményt elmenti a res.locals.employees-be
 */

 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     const EmployeeModel = requireOption(objectrepository, 'EmployeeModel');
 
     return function(req, res, next) {
         if (typeof res.locals.company === 'undefined') {
             return next();
         }
 
         EmployeeModel.find({ _company: res.locals.company._id }, (err, employees) => {
             if (err) {
                 return next(err);
             }
 
             res.locals.employees = employees;
             return next();
         });
     };
 };