const {body} = require('express-validator') 

exports.RegisterValidate = [
        body('name').isString().notEmpty(),
        body('email').isEmail().notEmpty(),
        body('password').isString().notEmpty(),
        body('country').isString().notEmpty(),
        body('city').isString().notEmpty(),
        body('address').isString().notEmpty(),
        body('phoneNumber').isNumeric().notEmpty(),
        body('openingHours').isArray().notEmpty(),
        body('role').optional().isString().isIn(['Admin', 'Client', 'Restaurant', 'Delivery']),
        body('createdAt').optional().isISO8601()
]

exports.LoginValidate = [
    // email
    body('email')
    .notEmpty()
    .withMessage('email is required')
    .isLength({min:5})
    .withMessage('email must be at least 5 characters long'),

    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:5})
    .withMessage('password must be at least 5 characters long'),
]