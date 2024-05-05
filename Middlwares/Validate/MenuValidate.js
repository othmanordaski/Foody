const {body} = require('express-validator')

exports.ValidateMenu = [
     // Menu schema validation
     body('name').isString().notEmpty(),
     body('description').isString().notEmpty(),
     body('price').isNumeric().notEmpty().isFloat({ min: 0 }),
     body('category').isString().isIn(['Appetizer', 'Main Course', 'Dessert', 'Beverage']),
     body('image').isString().notEmpty(),
     body('ownerId').isMongoId().notEmpty(),
     body('isPublished').isBoolean(),

     // Variation schema validation
     body('variations').isArray().optional().custom((variations) => {
         if (!variations || variations.length === 0) {
             throw new Error('Variations are required');
         }
         return true;
     }),
     body('variations.*.size').isString().notEmpty(),
     body('variations.*.price').isNumeric().notEmpty().isFloat({ min: 0 }),

     // Dietary schema validation
     body('dietary').isArray().optional(),
     body('dietary.*.type').isString().isIn(['Vegan', 'Vegetarian', 'Gluten-Free', 'Nut-Free', 'Dairy-Free', 'No Soy']),

     // Review schema validation
     body('reviews').isArray().optional(),
     body('reviews.*.name').isString().notEmpty(),
     body('reviews.*.rating').isNumeric().notEmpty().isFloat({ min: 1, max: 5 }),
     body('reviews.*.comment').isString().notEmpty(),
] 
