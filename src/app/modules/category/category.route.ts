import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import { CategoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategories);

router.get('/:id', CategoryControllers.getSingleCategory);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  CategoryControllers.deleteSingleCategory,
);

export const CategoryRoutes = router;
