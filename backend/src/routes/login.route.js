import { Router } from 'express';
import { getUserByEmail } from '../controller/login.controller.js';

const loginRoutes = Router();

loginRoutes.route('/:email').get(getUserByEmail);

export default loginRoutes;