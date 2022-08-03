const Joi = require('joi');
const { isUUID } = require('../constants/schema');

const getAllCT = {};

const createCT = {
  body: Joi.object({
    name: Joi.string().required(),
  }).required(),
};

const editCT = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
  }).required(),
  body: Joi.object({
    name: Joi.string().required(),
  }).required(),
};

const deleteCT = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
  }).required(),
};

module.exports = {
  getAllCT,
  createCT,
  editCT,
  deleteCT,
};
