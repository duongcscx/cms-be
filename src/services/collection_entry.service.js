const { Op } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const queryInterface = sequelize.getQueryInterface();
const CollectionEntry = require('../models/collection_entry.model');

/**
 *
 * @param {CTId: number}
 */
const getAllCE = async (CTId) => {
  const { rows, count } = await sequelize.model(CTId).findAndCountAll({
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
 * @param {CEId: number}
 */
const getCE = async (CTId, CEId) => {
  console.log('here');
  const CEFound = await sequelize.model(CTId).findByPk(CEId);
  return CEFound;
};

/**
 *
 * @param {userId: number}
 * @param {CEname: string}
 */
const createCE = async (CTId, CEContent) => {
  const CEFound = await sequelize.model(CTId).create(CEContent);
  return CEFound;
};

/**
 *
 * @param {CEId: number}
 * @param {name: string}
 */
const editCE = async (CTId, CEId, CEContent) => {
  console.log(CEContent);
  const CEFound = await sequelize.model(CTId).update(CEContent, {
    where: {
      id: CEId,
    },
  });
  return CEFound[0];
};

/**
 *
 * @param {{CEId}} CE ID
 */
const deleteCE = async (CTId, CEId) => {
  const CEFound = await sequelize.model(CTId).destroy({
    where: {
      id: CEId,
    },
  });
  return CEFound;
};

module.exports = {
  getAllCE,
  getCE,
  createCE,
  editCE,
  deleteCE,
};
