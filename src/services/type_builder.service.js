const { Op } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const queryInterface = sequelize.getQueryInterface();
const TypeBuilder = require('../models/type_builder.model');

const mapping = {
  Text: DataTypes.STRING,
  Number: DataTypes.DECIMAL,
  'Time Date': DataTypes.DATE,
};

/**
 *
 * @param {CTId: number}
 */
const getAllTB = async (CTId) => {
  const { rows, count } = await TypeBuilder.findAndCountAll({
    where: {
      collection_type_id: CTId,
    },
  });
  return {
    rows,
    count,
  };
};

/**
 *
 * @param {TBId: number}
 */
const getTB = async (TBId) => {
  const TBFound = await TypeBuilder.findByPk(TBId);
  return TBFound;
};

/**
 *
 * @param {CTid: number}
 * @param {dataName: string}
 * @param {dataType: string}
 */
const createTB = async (TBContent) => {
  const TBFound = await TypeBuilder.create(TBContent);
  return TBFound;
};

/**
 *
 * @param {TBId: number}
 * @param {dataName: string}
 * @param {dataType: string}
 */
const editTB = async (TBId, TBContent) => {
  const TBFound = await TypeBuilder.update(TBContent, {
    where: {
      id: TBId,
    },
  });
  return TBFound[0];
};

/**
 *
 * @param {{TBId}} CT ID
 */
const deleteTB = async (TBId) => {
  const TBFound = await TypeBuilder.destroy({
    where: {
      id: TBId,
    },
  });
  return TBFound;
};

const checkFieldExists = async (CTId, dataName, dataType) => {
  const columns = await queryInterface.describeTable(`${CTId}s`);
  return columns[dataName] !== undefined;
};

const createField = async (CTId, dataName, dataType) => {
  await queryInterface.addColumn(`${CTId}s`, dataName, mapping[dataType] || DataTypes.STRING);
  await sequelize.sync();
};

const removeField = async (CTId, dataName, dataType) => {
  await queryInterface.removeColumn(`${CTId}s`, dataName);
  await sequelize.sync();
};

module.exports = {
  getAllTB,
  getTB,
  createTB,
  editTB,
  deleteTB,
  checkFieldExists,
  createField,
  removeField,
};
