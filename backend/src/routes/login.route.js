import { Router } from 'express';
import { getPatientByEmail } from '../controller/login.controller.js';

const loginRoutes = Router();

loginRoutes.route('/:email').get(getPatientByEmail);

export default loginRoutes;