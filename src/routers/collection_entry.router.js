const auth = require('express').Router();
const validate = require('../middlewares/validate');
const CEschema = require('../schemas/collection_entry.schema');
const { CEController } = require('../controllers');
const authorize = require('../middlewares/authorize');

auth.get('/:CTId', validate(CEschema.getAllCE), authorize, CEController.getAllCE);
auth.post('/:CTId', validate(CEschema.createCE), authorize, CEController.createCE);
auth.patch('/:CTId/:CEId', validate(CEschema.editCE), authorize, CEController.editCE);
auth.delete('/:CTId/:CEId', validate(CEschema.deleteCE), authorize, CEController.deleteCE);

module.exports = auth;
