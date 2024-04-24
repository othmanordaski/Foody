const {body,validationResult} = require('express-validator') 

exports.Validate = [
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

    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:5})
    .withMessage('password must be at least 5 characters long'),
    // age
    body('age')
    .notEmpty()
    .withMessage('age is required')
    .isNumeric()
    .withMessage('age must be a number'),
    //country
    body('country')
    .notEmpty()
    .withMessage('country is required')
    .isLength({min:3})
    .withMessage('country must be at least 3 characters long'),
    //sex
    body('sex')
    .notEmpty()
    .withMessage('sex is required')
    .isLength({min:3})
    .withMessage('sex must be at least 3 characters long'),

    //phoneNumber
    body('phoneNumber')
    .notEmpty()
    .withMessage('phoneNumber is required')
    .isNumeric()
    .withMessage('phoneNumber must be at least 3 characters long'),
    //bio

    body('bio')
    .notEmpty()
    .withMessage('bio is required')
    .isLength({min:5})
    .withMessage('bio must be at least 5 characters long'),
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        next()
    }
]

