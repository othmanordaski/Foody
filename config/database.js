//mongodb+srv://sara:M6QL7ZgULnEjtWRm@cluster0.qfvpv3o.mongodb.net/
const { color, database } = require('./config'); // Import configuration settings
const mongoose = require('mongoose');

exports.connection = () => {
  function connectToMongo() {
    // Attempt to connect to the MongoDB database
    mongoose.connect(database.uri).then(
      () => {
        // Connection successful
      },
      (err) => {
        // Connection error
        console.info(color.red, 'Mongodb error', err);
      }
    ).catch((err) => {
      console.log(color.red, 'ERROR:', err);
    });
  }

  mongoose.connection.on('connected', () => {
    // Event: Connected to MongoDB
    console.info(color.green, 'Connected to MongoDB ✓');

  });

  mongoose.connection.on('reconnected', () => {
    // Event: MongoDB reconnected
    console.info('MongoDB reconnected!');
  });

  mongoose.connection.on('error', (error) => {
    // Event: Error in MongoDB connection
    console.error(color.red, `Error in MongoDB connection: ${error}`);
    mongoose.disconnect();
  });

  mongoose.connection.on('disconnected', () => {
    // Event: MongoDB disconnected
    console.error(color.red, `MongoDB disconnected! Reconnecting in ${2000 / 1000}s...`);
    setTimeout(() => connectToMongo(), 2000);
  });

  return {
    connectToMongo,
  };
};