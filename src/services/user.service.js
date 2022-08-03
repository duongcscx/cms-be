const _ = require('lodash');
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');
const { hashPassword } = require('../utils/security');

/**
 *
 * @param {{id: string; currentPassword; newPassword: string;}} userInfo
 */
const editUser = async (userInfo) => {
  // check password if requires change password
  if (userInfo.newPassword) {
    const { oldPassword } = userInfo;
    if (hashPassword(oldPassword || '') !== userInfo.currentPassword) {
      return {
        error: {
          status: httpStatus.FORBIDDEN,
          message: 'Current password is incorrect',
        },
      };
    }
  }

  await User.update(
    {
      password: userInfo.newPassword || undefined,
    },
    { where: { id: userInfo.id } }
  );

  return {
    user: _.omit((await User.findByPk(userInfo.id)).get({ plain: true }), 'password'),
  };
};

module.exports = {
  editUser,
};
