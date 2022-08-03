const { DataTypes } = require('sequelize');
const TypeBuilderFactory = require('../../database/models/type-builder');
const sequelize = require('../configs/database');

const TypeBuilder = TypeBuilderFactory(sequelize, DataTypes);

module.exports = TypeBuilder;
