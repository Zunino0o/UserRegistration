import { Router } from 'express';
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from '../controller/patient.controller.js';

const patientRoutes = Router();

patientRoutes.route('/').get(getPatients).post(createPatient);

patientRoutes
  .route('/:id')
  .get(getPatientById)
  .put(updatePatient)
  .delete(deletePatient);

export default patientRoutes;
