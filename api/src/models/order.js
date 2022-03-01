const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Order = sequelize.define('order', {


    creator: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    cid: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    customer: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    customerIdentification: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    products: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    discounts: {
        type:  DataTypes.INTEGER,
        allowNull: false,
    },

    taxes: {
        type:  DataTypes.INTEGER,
        allowNull: false,
    },

    totalNet: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    applicationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    state :{
        type: DataTypes.STRING,
        allowNull: false,
    }, 

    priority:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    dispatcher:{
        type: DataTypes.STRING,
        allowNull: false,
    }
    

});

module.exports = {
    Order
};



