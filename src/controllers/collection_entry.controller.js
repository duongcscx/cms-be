const httpStatus = require('http-status');
const sendError = require('../utils/sendError');
const sendResponse = require('../utils/sendResponse');
const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');
const { CTService } = require('../services');
const { CEService } = require('../services');

const getAllCE = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { CTId } = req.params;
  logger.info(`Get many collection entries: User: ${user.email}`);

  const data = await CEService.getAllCE(CTId);

  logger.info(`Get many collection entries: Done`);

  if (data.count === 0) {
    return sendResponse(res, { data }, 'Empty collection entry');
  }

  return sendResponse(res, { data });
});

const createCE = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { CTId } = req.params;
  const CEContent = {
    ...req.body,
    collection_type_id: CTId,
  };

  logger.info(`Create collection entry: User: ${user.email}`);

  const willEditCT = await CTService.getCT(CTId);
  if (willEditCT === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested collection type is not exists on database');
  }
  if (willEditCT.user_id !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this collection type');
  }

  const addedCollectionEntry = await CEService.createCE(CTId, CEContent);

  logger.info(`Create collection entries: Done`);

  return sendResponse(res, { addedCollectionEntry }, 'Create collection entry successfully');
});

const editCE = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { CEId, CTId } = req.params;
  const CEContent = {
    ...req.body,
    collection_type_id: CTId,
  };

  logger.info(`Edit collection entry: User: ${user.email}`);

  const willEditCE = await CEService.getCE(CTId, CEId);
  if (willEditCE === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested collection entry is not exists on database');
  }

  if (willEditCE.collection_type_id !== CTId) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The request is invalid');
  }

  const willEditCECT = await CTService.getCT(CTId);
  if (willEditCECT.user_id !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this collection entry');
  }

  const editedCE = await CEService.editCE(CTId, CEId, CEContent);

  logger.info(`Edit collection entries: Done`);

  if (!editedCE) return sendResponse(res, {}, 'Edit failed!');

  const foundCE = await CEService.getCE(CTId, CEId);

  return sendResponse(res, { CE: foundCE }, 'Edit successfully!');
});

const deleteCE = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { CEId, CTId } = req.params;

  logger.info(`Delete collection entry: User: ${user.email}`);

  const willDeleteCE = await CEService.getCE(CTId, CEId);
  if (willDeleteCE === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested collection entry is not exists on database');
  }

  if (willDeleteCE.collection_type_id !== CTId) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The request invalid');
  }

  const willDeleteCECT = await CTService.getCT(CTId);
  if (willDeleteCECT.user_id !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this collection entry');
  }

  const deletedCE = await CEService.deleteCE(CTId, CEId);

  logger.info(`Delete collection entry: Done`);

  if (!deletedCE) return sendResponse(res, {}, 'Can not delete collection entry!');

  return sendResponse(res, {}, 'Delete collection entry successfully!');
});

module.exports = {
  getAllCE,
  createCE,
  deleteCE,
  editCE,
};
