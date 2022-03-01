require('dotenv').config();
const { Sequelize } = require('sequelize');

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/fastBuy`, {
    logging: false,
    native: false,
});

async function connection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connection()

module.exports = {
    sequelize
}