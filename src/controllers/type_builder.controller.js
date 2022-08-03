const httpStatus = require('http-status');
const sendError = require('../utils/sendError');
const sendResponse = require('../utils/sendResponse');
const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');
const { CTService } = require('../services');
const { TBService } = require('../services');

const getAllTB = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { CTId } = req.params;
  logger.info(`Get many type builders: User: ${user.email}`);
  const data = await TBService.getAllTB(CTId);
  logger.info(`Get many type builders: Done`);

  if (data.count === 0) {
    return sendResponse(res, { data }, 'Empty type builder');
  }

  return sendResponse(res, { data });
});

const createTB = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { CTId } = req.params;
  const TBContent = {
    ...req.body,
    collection_type_id: CTId,
  };

  logger.info(`Create type builder: User: ${user.email}`);

  const willEditCT = await CTService.getCT(CTId);
  if (willEditCT === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested type builder is not exists on database');
  }
  if (willEditCT.user_id !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this type builder');
  }
  const existsFileName = await TBService.checkFieldExists(CTId, req.body.data_name, req.body.data_type);
  if (existsFileName) {
    return sendError(res, httpStatus.BAD_REQUEST, 'Field name exists');
  }

  const addedCollectionType = await TBService.createTB(TBContent);

  logger.info(`Create type builders: Done`);

  TBService.createField(CTId, req.body.data_name, req.body.data_type);

  return sendResponse(res, { addedCollectionType }, 'Create type builder successfully');
});

const editTB = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { TBId, CTId } = req.params;
  const TBContent = {
    ...req.body,
    collection_type_id: CTId,
  };

  logger.info(`Edit type builder: User: ${user.email}`);

  const willEditTB = await TBService.getTB(TBId);
  if (willEditTB === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested type builder is not exists on database');
  }

  if (willEditTB.collection_type_id !== CTId) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The request is invalid');
  }

  const willEditTBCT = await CTService.getCT(CTId);
  if (willEditTBCT.user_id !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this type builder');
  }

  const editedTB = await TBService.editTB(TBId, TBContent);

  logger.info(`Edit type builders: Done`);

  if (!editedTB) return sendResponse(res, {}, 'Edit failed!');

  const foundTB = await TBService.getTB(TBId);

  return sendResponse(res, { TB: foundTB }, 'Edit successfully!');
});

const deleteTB = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { TBId, CTId } = req.params;

  logger.info(`Delete type builder: User: ${user.email}`);

  const willDeleteTB = await TBService.getTB(TBId);
  if (willDeleteTB === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested type builder is not exists on database');
  }

  if (willDeleteTB.collection_type_id !== CTId) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The request invalid');
  }

  const willDeleteTBCT = await CTService.getCT(CTId);
  if (willDeleteTBCT.user_id !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this type builder');
  }
  const deletedTB = await TBService.deleteTB(TBId);

  logger.info(`Delete type builder: Done`);

  if (!deletedTB) return sendResponse(res, {}, 'Can not delete type builder!');

  await TBService.removeField(CTId, willDeleteTB.data_name, willDeleteTB.data_type);
  return sendResponse(res, {}, 'Delete type builder successfully!');
});

module.exports = {
  getAllTB,
  createTB,
  deleteTB,
  editTB,
};
