const Joi = require('joi');

const { isPassword } = require('../constants/schema');

const editUser = {
  body: Joi.object({
    oldPassword: isPassword.required(),
    newPassword: isPassword.required(),
  }).required(),
};

module.exports = {
  editUser,
};
