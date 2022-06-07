/**
 * POST esetén frissíti az employee-hez tartozó paramétereket vagy egy újat hoz létre
 * Ha res.locals.employee létezik, akkor frissítés különben új employee-t hoz létre
 * Siker esetén átirányít: /employee/:companyid 
 */

 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
    const EmployeeModel = requireOption(objectrepository, 'EmployeeModel');

    return function(req, res, next) {
        if (
            req.method === 'GET' ||
            typeof req.body.name === 'undefined' ||
            typeof req.body.telephone === 'undefined' ||
            typeof req.body.telephoneNumber === 'undefined' ||
            typeof res.locals.company === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.employee === 'undefined') {
            res.locals.employee = new EmployeeModel();
        }


        res.locals.employee.name = req.body.name;
        res.locals.employee.telephone = req.body.telephone;
        res.locals.employee.telephoneNumber = req.body.telephoneNumber;
        res.locals.employee._company = res.locals.company._id;

        res.locals.employee.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/employee/${res.locals.company._id}`);
        });
    };
};