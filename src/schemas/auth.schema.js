const Joi = require('joi');
const { isPassword } = require('../constants/schema');

const signUp = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: isPassword.required(),
    role: Joi.string()
      .valid(...['admin', 'editor', 'creator'])
      .required(),
  }).required(),
};

const logIn = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: isPassword.required(),
  }).required(),
};

module.exports = {
  signUp,
  logIn,
};
