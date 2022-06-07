/**
 * Betölt egy Company-t az adatbázisból :companyid paraméter segítségével
 * Az eredményt elmenti a res.locals.company-be
 */

 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     const CompanyModel = requireOption(objectrepository, 'CompanyModel');
 
     return function(req, res, next) {
        CompanyModel.findOne({ _id: req.params.companyid }, (err, company) => {
             if (err || !company) {
                 return next(err);
             }
 
             res.locals.company = company;
             return next();
         });
     };
 };