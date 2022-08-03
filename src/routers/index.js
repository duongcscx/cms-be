const routers = require('express').Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const CTRouter = require('./collection_type.router');
const CERouter = require('./collection_entry.router');
const TBRouter = require('./type_builder.router');

routers.use('/auth', authRouter);
routers.use('/user', userRouter);
routers.use('/collection_type', CTRouter);
routers.use('/type_builder', TBRouter);
routers.use('/collection_entry', CERouter);

module.exports = routers;
