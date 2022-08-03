const httpStatus = require('http-status');
const sendError = require('../utils/sendError');
const sendResponse = require('../utils/sendResponse');
const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');
const { CTService } = require('../services');
const { createTable, removeTable } = require('../services/collection_type.service');

const getAllCT = catchAsync(async (req, res) => {
  const { user } = req.authorized;

  logger.info(`Get many collection types: User: ${user.email}`);
  const data = await CTService.getAllCT(user.id);
  logger.info(`Get many collection types: Done`);

  if (data.count === 0) {
    return sendResponse(res, { data }, 'Empty Collection Type');
  }

  return sendResponse(res, { data });
});

const createCT = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const CTContent = {
    ...req.body,
    user_id: user.id,
  };
  logger.info(`Create collection type: User: ${user.email}`);

  const addedCollectionType = await CTService.createCT(CTContent);

  logger.info(`Create collection types: Done`);
  createTable(addedCollectionType.id);
  return sendResponse(res, { addedCollectionType }, 'Create collection type successfully');
});

const editCT = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { CTId } = req.params;
  const CTContent = req.body;

  logger.info(`Edit collection type: User: ${user.email}`);

  const willEditCT = await CTService.getCT(CTId);
  if (willEditCT === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested collection type is not exists on database');
  }
  if (willEditCT.user_id !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this collection type');
  }

  const editedCT = await CTService.editCT(CTId, CTContent);

  logger.info(`Edit collection types: Done`);

  if (!editedCT) return sendResponse(res, {}, 'Edit failed!');

  const foundCT = await CTService.getCT(CTId);

  return sendResponse(res, { CT: foundCT }, 'Edit successfully!');
});

const deleteCT = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { CTId } = req.params;

  logger.info(`Delete collection type: User: ${user.email}`);

  const willdeleteCT = await CTService.getCT(CTId);

  if (willdeleteCT === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested collection type is not exists on database');
  }
  if (willdeleteCT.user_id !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this collection type');
  }

  const deletedCT = await CTService.deleteCT(CTId);

  logger.info(`Delete collection type: Done`);

  if (!deletedCT) return sendResponse(res, {}, 'Can not delete collection type!');
  removeTable(CTId);
  return sendResponse(res, {}, 'Delete collection type successfully!');
});

module.exports = {
  getAllCT,
  createCT,
  deleteCT,
  editCT,
};
