const auth = require('express').Router();
const validate = require('../middlewares/validate');
const CTschema = require('../schemas/collection_type.schema');
const { CTController } = require('../controllers');
const authorize = require('../middlewares/authorize');

auth.get('/', validate(CTschema.getAllCT), authorize, CTController.getAllCT);
auth.post('/', validate(CTschema.createCT), authorize, CTController.createCT);
auth.patch('/:CTId', validate(CTschema.editCT), authorize, CTController.editCT);
auth.delete('/:CTId', validate(CTschema.deleteCT), authorize, CTController.deleteCT);

module.exports = auth;
