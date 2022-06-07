/**
 * Betölti az összes company-t az adatbázisból
 * Az eredményt elmenti a res.locals.companies-be
 */
 const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CompanyModel = requireOption(objectrepository, 'CompanyModel');

    return function(req, res, next) {
    CompanyModel.find({}, (err, companies) => {
            if (err) {
                return next(err);
            }

            res.locals.companies = companies;
            return next();
        });
    };
};
