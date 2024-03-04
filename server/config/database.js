// config/database.js
const mongoose = require('mongoose');

const getDbConnection = (dbName) => {
    const uri = `mongodb+srv://libacademy:libacademy@cluster0.tatdwkr.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
    return mongoose.createConnection(uri)
};

module.exports = getDbConnection;
