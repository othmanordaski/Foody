require('dotenv').config()
const {server} = require('./config/config');

//const passport = require('./config/passport-config')
const PORT = server.PORT

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

//Import the database connection function 
const {connection} = require('./config/database')
const database = connection()

//Middleware setup
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// Initialize Passport
//app.use(passport.initialize())

//Connect to the MongoDb databse
database.connectToMongo()

const restaurant = require('./Routes/RestaurantRoute')
const deliveryRoutes = require('./Routes/DeliveryRoute')
const userRoutes = require('./Routes/UserRoute')
const {default : mongoose} = require('mongoose')

app.use('/client',userRoutes)
app.use('/restaurant',restaurant)
app.use('/delivery',deliveryRoutes)

app.use((err, req, res, next) => {
    // Handle errors and respond accordingly
    console.error(err);
    res.status(strings.SERVER_HTTP_VERSION_NOT_SUPPORTED_HTTP_CODE).json({ error: strings.EMPTY_REQUEST_FOR_UPDATE });
});

// Start the Express server and listen on port 3000
app.listen(PORT, () => {
    console.log('Listening on port' + PORT);
})
