const _ = require('lodash');

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const editUser = catchAsync(async (req, res) => {
  const {
    user: { id, password: currentPassword },
  } = req.authorized;
  const updatedInfo = req.body;
  const { user, error } = await userService.editUser({
    id,
    currentPassword,
    ...updatedInfo,
  });

  if (error) {
    return res.status(error.status).json(error);
  }
  res.status(httpStatus.OK).json({ user });
});

module.exports = {
  editUser,
};
