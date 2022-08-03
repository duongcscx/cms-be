const { DataTypes } = require('sequelize');
const CollectionEntryFactory = require('../../database/models/collection-entry');
const sequelize = require('../configs/database');

const CollectionEntry = CollectionEntryFactory(sequelize, DataTypes);

module.exports = CollectionEntry;
