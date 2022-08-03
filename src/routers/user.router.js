const auth = require('express').Router();
const { userController } = require('../controllers');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { editUser } = require('../schemas/user.schema');

auth.patch('/', authorize, validate(editUser), userController.editUser);

module.exports = auth;
