/**
 * Betölt egy Employee-t az adatbázisból :employeeid paraméter segítségével
 * Az eredményt elmenti a res.locals.employee-be
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const EmployeeModel = requireOption(objectrepository, 'EmployeeModel');

    return function(req, res, next) {
        EmployeeModel.findOne(
            {
                _id: req.params.employeeid
            },
            (err, employee) => {
                if (err || !employee) {
                    return next(err);
                }

                res.locals.employee = employee;
                return next();
            }
        );
    };
};