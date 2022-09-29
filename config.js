const dotenv = require('dotenv');

dotenv.config();

module.exports = {

    MONGO_DB: {
        CONN_STRING: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
    }
};