const dotenv = require('dotenv');
const path = require("path");

dotenv.config();

module.exports = {
    STORE_DATASOURCE: process.env.STORE_DATASOURCE,
    MONGO_DB: {
        CONN_STRING: process.env.MONGO_CONN_STRING.replace('<DB>', process.env.MONGO_DB) || `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
    },
    FIREBASE_DB: {
        SA_PATH: path.resolve("db", process.env.FIREBASE_SA_FILENAME)
    }
};