/*
 * Paraméterként kapott template-t kirendereli
*/

const requireOption = require('./requireOption');

module.exports = function(objRep, ejsTemplate) {
    return (req, res, next) => {
        res.render(ejsTemplate);
    }
}