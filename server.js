require('dotenv').config()
const {server} = require('./config/config');
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

//Connect to the MongoDb databse
database.connectToMongo()

const deliveryRoutes = require('./Routes/DeliveryRoute')
const {default : mongoose} = require('mongoose')
app.use('/delivery',deliveryRoutes)

// Start the Express server and listen on port 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});