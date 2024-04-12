const { Router } = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/user.controller.js');

const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default userRouter;
