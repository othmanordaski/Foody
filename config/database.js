const mongoose = require('mongoose')

exports.connection = () => {
    function connectToMongo(){
        mongoose.connect('mongodb+srv://sara:M6QL7ZgULnEjtWRm@cluster0.qfvpv3o.mongodb.net/')
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch(err => console.error('Error connecting to MongoDB Atlas', err));
    }

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to MongoDB Atlas');
    });
    
    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from MongoDB Atlas');
    });

    return{
        connectToMongo,
    }
}
