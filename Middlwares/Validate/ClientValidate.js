const {body} = require('express-validator') 

exports.RegisterValidate = [
    // username
    body('username')
    .notEmpty()
    .withMessage('username is required')
    .isLength({min:3})
    .withMessage('username must be at least 3 characters long'),
    // email
    body('email')
    .notEmpty()
    .withMessage('email is required')
    .isLength({min:5})
    .withMessage('email must be at least 5 characters long'),
    //password
    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:5})
    .withMessage('password must be at least 5 characters long'),
    //client address
    body('clientAddress')
    .notEmpty()
    .withMessage('clientAddress is required')
    .isLength({min:3})
    .withMessage('clientAddress must be at least 3 characters long'),
    // age
    body('age')
    .notEmpty()
    .withMessage('age is required')
    .isNumeric()
    .withMessage('age must be a number'),

    //phoneNumber
    body('phoneNumber')
    .notEmpty()
    .withMessage('phoneNumber is required')
    .isNumeric()
    .withMessage('phoneNumber must be at least 3 characters long'),
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