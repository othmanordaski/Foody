require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Set default port to 3000 if PORT environment variable is not defined

// Import the database connection function
const { connection } = require('./config/database');
const database = connection();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the MongoDB database
database.connectToMongo();

// Import routes
const restaurantRoutes = require('./Routes/RestaurantRoutes');
const userRoutes = require('./routes/userRoutes'); // Corrected file path casing

// Use routes
app.use('/restaurant', restaurantRoutes);
app.use('/client', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    // Handle errors and respond accordingly
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); // Generic error response for demonstration
});

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
