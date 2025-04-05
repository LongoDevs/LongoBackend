const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  full_name: DataTypes.STRING,
  email: DataTypes.STRING,
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ratings_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  average_rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
});

module.exports = User;
