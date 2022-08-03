const auth = require('express').Router();
const validate = require('../middlewares/validate');
const TBschema = require('../schemas/type_builder.schema');
const { TBController } = require('../controllers');
const authorize = require('../middlewares/authorize');

auth.get('/:CTId', validate(TBschema.getAllTB), authorize, TBController.getAllTB);
auth.post('/:CTId', validate(TBschema.createTB), authorize, TBController.createTB);
auth.patch('/:CTId/:TBId', validate(TBschema.editTB), authorize, TBController.editTB);
auth.delete('/:CTId/:TBId', validate(TBschema.deleteTB), authorize, TBController.deleteTB);

module.exports = auth;
