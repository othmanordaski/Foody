const Restaurant = require('../Modals/Schema/RestaurantSch');
const { sendEmail } = require('../Helpers/mailer');
const { hashPassword, comparePassword } = require('../Helpers/Hashing');
const { generateToken } = require('../Helpers/JWT');

// Controller to render the registration page
exports.renderRegister = (req, res) => res.send('/register');

// Controller to render the login page
exports.renderLogin = (req, res) => res.send('/login');

// Controller to register a new restaurant
exports.registerRestaurant = async (req, res) => {
    try {
        const { name, email, password, country, city, address, phoneNumber, openingHours, menu } = req.body;

        // Check if the restaurant already exists
        const existingRestaurant = await Restaurant.findOne({ email });
        if (existingRestaurant) {
            return res.status(400).json({ message: 'Restaurant already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        // Create a new restaurant instance
        const newRestaurant = new Restaurant({ name, email, password: hashedPassword, country, city, address, phoneNumber, openingHours, menu });

        // Save the new restaurant
        const result = await newRestaurant.save();

        // Send registration email
        sendEmail(newRestaurant.email, newRestaurant.name);

        // Send success response
        res.status(200).send('Restaurant registration successful');
    } catch (error) {
        console.error('Error registering restaurant:', error);
        res.status(500).send('Server Error');
    }
};

// Controller to handle restaurant login
exports.restaurantLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the restaurant by email
        const restaurant = await Restaurant.findOne({ email });
        if (!restaurant) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Compare passwords
        const isPasswordValid = await comparePassword(password, restaurant.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        // Generate JWT token
        const token = await generateToken({ restaurant });

        // Send success response with token
        res.status(200).cookie('tokenAuth', token).json({ message: 'Restaurant logged successfully', token });
    } catch (error) {
        console.error('Error logging in restaurant:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller to get restaurant profile by ID
exports.getRestaurantProfile = async (req, res) => {
    try {
        const ownerId = req.params.id;

        // Find the restaurant by ID
        const restaurantProfile = await Restaurant.findById(ownerId);
        if (!restaurantProfile) {
            return res.status(404).json({ error: 'Restaurant owner profile not found' });
        }

        // Send restaurant profile
        res.status(200).json(restaurantProfile);
    } catch (error) {
        console.error('Error getting restaurant owner profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to update restaurant profile by ID
exports.updateRestaurantProfile = async (req, res) => {
    try {
        const ownerId = req.params.id;

        // Find the existing restaurant
        const existingOwner = await Restaurant.findById(ownerId);
        if (!existingOwner) {
            return res.status(404).json({ error: 'Restaurant owner not found' });
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
        res.status(200).json({ message: 'Restaurant owner profile updated successfully', owner: updatedOwner });
    } catch (error) {
        console.error('Error updating restaurant owner profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to delete restaurant profile by ID
exports.deleteRestaurantProfile = async (req, res) => {
    try {
        const ownerId = req.params.id;

        // Delete the restaurant by ID
        const deletedOwner = await Restaurant.findByIdAndDelete(ownerId);
        if (deletedOwner) {
            return res.status(200).json({ message: 'Restaurant owner profile deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Restaurant owner not found' });
        }
    } catch (error) {
        console.error('Error during profile deletion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
