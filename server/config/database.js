// config/database.js
const mongoose = require('mongoose');

const getDbConnection = () => {
    const uri = `mongodb+srv://libacademy:libacademy@cluster0.tatdwkr.mongodb.net/LibAcademy?retryWrites=true&w=majority&appName=Cluster0`;
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