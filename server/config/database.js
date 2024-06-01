// config/database.js
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const getDbConnection = () => {
    const uri = `${process.env.MONGODB_URI}`;
    const connection = mongoose.createConnection(uri);

    // Listen for the 'connected' event to confirm the connection was successful
    connection.on('connected', () => {
        console.log(`Mongoose connected to the database: LibAcademy`);
    });

    // Listen for the 'error' event to handle any connection errors
    connection.on('error', (err) => {
        console.error(`Mongoose connection error to database LibAcademy ${err}`);
    });

    return connection;
};

module.exports = getDbConnection();