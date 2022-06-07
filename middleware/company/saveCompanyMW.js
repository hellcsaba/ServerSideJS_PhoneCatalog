/**
 * POST esetén frissíti az company-hez tartozó paramétereket vagy egy újat hoz létre
 * Ha res.locals.company létezik, akkor frissítés különben új company-t hoz létre
 * Siker esetén átirányít: /
 */

 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     const CompanyModel = requireOption(objectrepository, 'CompanyModel');
     //console.log("saveMW CompanyModel");
     return function(req, res, next) {
         if (
             req.method === 'GET' ||
             typeof req.body.name === 'undefined' ||
             typeof req.body.site === 'undefined'
         ) {
            //console.log("saveMW check");
             return next();
         }
 
         if (typeof res.locals.company === 'undefined') {
            //console.log("saveMW locals.company undefined");
             res.locals.company = new CompanyModel();
         }
 
         res.locals.company.name = req.body.name;
         res.locals.company.site = req.body.site;
 
         res.locals.company.save(err => {
             if (err) {
                //console.log("saveMW company.save error");
                 return next(err);
             }
             //console.log("saveMW redirect");
             return res.redirect('/');
         });
     };
 };