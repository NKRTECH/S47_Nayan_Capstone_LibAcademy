// config/database.js
const mongoose = require('mongoose');

const getDbConnection = (dbName) => {
    const uri = `mongodb+srv://libacademy:libacademy@cluster0.tatdwkr.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
    const connection = mongoose.createConnection(uri);

    // Listen for the 'connected' event to confirm the connection was successful
    connection.on('connected', () => {
        console.log(`Mongoose connected to the database: ${dbName}`);
    });

    // Listen for the 'error' event to handle any connection errors
    connection.on('error', (err) => {
        console.error(`Mongoose connection error to database ${dbName}: ${err}`);
    });

    return connection;
};

module.exports = getDbConnection;