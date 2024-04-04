import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controller/user.controller.js';

const userRoutes = Router();

userRoutes.route('/').get(getUsers).post(createUser);

userRoutes
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default userRoutes;
