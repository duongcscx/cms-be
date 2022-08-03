const { DataTypes } = require('sequelize');
const CollectionTypeFactory = require('../../database/models/collection-type');
const sequelize = require('../configs/database');

const CollectionType = CollectionTypeFactory(sequelize, DataTypes);

module.exports = CollectionType;
