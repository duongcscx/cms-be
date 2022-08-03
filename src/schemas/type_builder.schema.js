const Joi = require('joi');
const { isUUID } = require('../constants/schema');

const getAllTB = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
  }).required(),
};

const createTB = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
  }).required(),
  body: Joi.object({
    data_name: Joi.string().required(),
    data_type: Joi.string().required(),
  }).required(),
};

const editTB = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
    TBId: Joi.string().custom(isUUID, 'Check type builder ID format').required(),
  }).required(),
  body: Joi.object({
    data_name: Joi.string().required(),
    data_type: Joi.string().required(),
  }).required(),
};

const deleteTB = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
    TBId: Joi.string().custom(isUUID, 'Check type builder ID format').required(),
  }).required(),
};

module.exports = {
  getAllTB,
  createTB,
  editTB,
  deleteTB,
};
