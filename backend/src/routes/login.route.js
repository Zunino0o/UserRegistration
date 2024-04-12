const { Router } = require('express');
const { getUserByEmail } = require('../controller/login.controller.js');

const loginRouter = Router();

loginRouter.route('/:email').get(getUserByEmail);

export default loginRouter;