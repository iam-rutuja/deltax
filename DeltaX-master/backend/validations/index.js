const { validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    let errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    next();
}