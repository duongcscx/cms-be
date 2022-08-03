const Joi = require('joi');
const { isUUID } = require('../constants/schema');

const getAllCE = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
  }).required(),
};

const createCE = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
  }).required(),
  body: Joi.object({
    isPublished: Joi.boolean().required(),
  })
    .unknown()
    .required(),
};

const editCE = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
    CEId: Joi.string().custom(isUUID, 'Check collection entry ID format').required(),
  }).required(),
  body: Joi.object({
    isPublished: Joi.boolean().required(),
  })
    .unknown()
    .required(),
};

const deleteCE = {
  params: Joi.object({
    CTId: Joi.string().custom(isUUID, 'Check collection type ID format').required(),
    CEId: Joi.string().custom(isUUID, 'Check collection entry ID format').required(),
  }).required(),
};

module.exports = {
  getAllCE,
  createCE,
  editCE,
  deleteCE,
};
