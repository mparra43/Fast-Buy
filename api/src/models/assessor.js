const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Assessor = sequelize.define('assessor', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    rol:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = {
    Assessor 
};