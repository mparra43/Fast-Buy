const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Product = sequelize.define('product', {


    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    units: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = {
    Product
};