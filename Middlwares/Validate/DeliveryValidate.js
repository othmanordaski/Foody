const {body} = require('express-validator') 

exports.RegisterValidate = [
    body('username').isString().notEmpty(),
        body('phoneNumber').isNumeric().notEmpty(),
        body('email').isEmail().notEmpty(),
        body('password').isString().notEmpty(),
        body('address').isString().notEmpty(),
        body('vehicleType').isString().isIn(['car', 'moto']).notEmpty(),
        body('vehiclePlateNumber').isString().notEmpty(),
        body('status').optional().isString().isIn(['available', 'busy', 'offline']),
        body('role').optional().isString().isIn(['Admin', 'Client', 'Restaurant', 'Delivery']),
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