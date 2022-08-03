const { Op } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const queryInterface = sequelize.getQueryInterface();
const CollectionType = require('../models/collection_type.model');

/**
 *
 * @param {userId: number}
 */
const getAllCT = async (userId) => {
  const { rows, count } = await CollectionType.findAndCountAll({
    where: {
      user_id: userId,
    },
  });
  return {
    rows,
    count,
  };
};

/**
 *
 * @param {CTId: number}
 */
const getCT = async (CTId) => {
  const CTFound = await CollectionType.findByPk(CTId);
  return CTFound;
};

/**
 *
 * @param {userId: number}
 * @param {CTname: string}
 */
const createCT = async (CTContent) => {
  const CTFound = await CollectionType.create(CTContent);
  return CTFound;
};

/**
 *
 * @param {CTId: number}
 * @param {name: string}
 */
const editCT = async (CTId, CTContent) => {
  const CTFound = await CollectionType.update(CTContent, {
    where: {
      id: CTId,
    },
  });
  return CTFound[0];
};

/**
 *
 * @param {{CTId}} CT ID
 */
const deleteCT = async (CTId) => {
  const CTFound = await CollectionType.destroy({
    where: {
      id: CTId,
    },
  });
  return CTFound;
};

const createTable = async (CTId) => {
  await sequelize.define(
    CTId,
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      collection_type_id: {
        type: DataTypes.UUID,
        references: {
          model: 'CollectionTypes',
          key: 'id',
        },
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: CTId,
      timestamps: false,
    }
  );
  await sequelize.sync();
};

const removeTable = async (CTId) => {
  await queryInterface.dropTable(CTId);
  await sequelize.sync();
};

module.exports = {
  getAllCT,
  getCT,
  createCT,
  editCT,
  deleteCT,
  createTable,
  removeTable,
};
