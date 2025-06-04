import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser);

router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.getSingleUser,
);

router.put(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.put('/:id', auth(USER_ROLE.admin), UserControllers.banUser);

router.patch(
  '/role-status/:id',
  auth(USER_ROLE.admin),
  UserControllers.changeRoleAndStatus,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
