const { validationResult } = require('express-validator');

module.exports = function(req, res, next) {
    const errorFormatter = ({ msg }) => {
        var obj = msg;
        return obj;
    };

    const errors = validationResult(req).formatWith(errorFormatter);

    if(!errors.isEmpty())
        return res.status(400).send(errors.mapped());
    else
        next();
}