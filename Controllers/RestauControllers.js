const Restaurant = require('../Modals/Schema/RestaurantSch');
const { RESPONSE_MESSAGES, HTTP_STATUS_CODES } = require('../config/constants');
const { sendEmail } = require('../Helpers/mailer');
const { hashPassword, comparePassword } = require('../Helpers/Hashing');
const { generateToken } = require('../Helpers/JWT');

// Controller to register a new restaurant
exports.registerRestaurant = async (req, res) => {
    try {
        const { name, email, password, country, city, address, phoneNumber, openingHours, menu, role } = req.body;

        const existingRestaurant = await Restaurant.findOne({ email });
        if (existingRestaurant) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: RESPONSE_MESSAGES.RESTAU_ALREADY_EXIST });
        }

        const hashedPassword = await hashPassword(password);

        const newRestaurant = new Restaurant({ 
            name, 
            email, 
            password: hashedPassword, 
            country, 
            city, 
            address, 
            phoneNumber, 
            openingHours, 
            menu ,
            role
        });

        const result = await newRestaurant.save();

        sendEmail(newRestaurant.email, newRestaurant.name);

        res.status(HTTP_STATUS_CODES.OK).send(RESPONSE_MESSAGES.RESTAU_CREATED_SUCCESS);
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
};

// Controller to handle restaurant login
exports.restaurantLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the restaurant by email
        const restaurant = await Restaurant.findOne({ email });
        if (!restaurant) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: RESPONSE_MESSAGES.RESTAU_NOT_FOUND});
        }

        // Compare passwords
        const isPasswordValid = await comparePassword(password, restaurant.password);
        if (!isPasswordValid) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: RESPONSE_MESSAGES.RESTAU_INVALID_PASSWORD });
        }

        // Generate JWT token
        const token = await generateToken(restaurant);

        // Send success response with token
        res.status(HTTP_STATUS_CODES.OK).cookie('tokenAuth', token).json({ message: RESPONSE_MESSAGES.SUCCESS, token });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

// Controller to get restaurant profile by ID
exports.getRestaurantProfile = async (req, res) => {
    try {
        const {_id} = req.user;
        // Find the restaurant by ID
        const restaurantProfile = await Restaurant.findById({_id});
        if (!restaurantProfile) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.RESTAU_NOT_FOUND });
        }
        const fieldsToView = {
            name : restaurantProfile.name,
            email : restaurantProfile.email,
            country : restaurantProfile.country,
            city : restaurantProfile.city,
            address : restaurantProfile.address,
            phoneNumber : restaurantProfile.phoneNumber,
            openingHours : restaurantProfile.openingHours,
            menu : restaurantProfile.menu,
            role: restaurantProfile.role,
        }
        res.status(HTTP_STATUS_CODES.OK).json(fieldsToView);
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

// Controller to update restaurant profile by ID
exports.updateRestaurantProfile = async (req, res) => {
    try {
        const ownerId = req.params.id;

        // Find the existing restaurant
        const existingOwner = await Restaurant.findById(ownerId);
        if (!existingOwner) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.RESTAU_NOT_FOUND });
        }

        // Prepare updated data
        const updatedData = {
            name: req.body.name || existingOwner.name,
            email: req.body.email || existingOwner.email,
            country: req.body.country || existingOwner.country,
            city: req.body.city || existingOwner.city,
            address: req.body.address || existingOwner.address,
            phoneNumber: req.body.phoneNumber || existingOwner.phoneNumber,
            openingHours: req.body.openingHours || existingOwner.openingHours,
        };

        // Check if a new password is provided
        if (req.body.password) {
            const passwordMatch = await bcrypt.compare(req.body.password, existingOwner.password);
            if (!passwordMatch) {
                updatedData.password = await bcrypt.hash(req.body.password, 10);
            }
        }

        // Update menu items if provided in the request
        if (req.body.menu) {
            updatedData.menu = req.body.menu;
        }

        // Update the restaurant
        const updatedOwner = await Restaurant.findByIdAndUpdate(ownerId, updatedData, { new: true });

        // Send success response
        res.status(HTTP_STATUS_CODES.OK).json({ message: RESPONSE_MESSAGES.RESTAU_UPDATED_SUCCESS, owner: updatedOwner });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json( RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR );
    }
};

// Controller to delete restaurant profile by ID
exports.deleteRestaurantProfile = async (req, res) => {
    try {
        const ownerId = req.params.id;

        // Delete the restaurant by ID
        const deletedOwner = await Restaurant.findByIdAndDelete(ownerId);
        if (deletedOwner) {
            return res.status(HTTP_STATUS_CODES.OK).json({ message: RESPONSE_MESSAGES.RESTAU_DELETED_SUCCESS });
        } else {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: RESPONSE_MESSAGES.RESTAU_NOT_FOUND });
        }
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};