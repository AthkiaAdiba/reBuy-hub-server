import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import { ItemValidations } from './item.validation';
import { ItemControllers } from './item.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(ItemValidations.createItemValidationSchema),
  ItemControllers.createItem,
);

router.get('/:id', ItemControllers.getSingleItem);

router.get('/', ItemControllers.getAllItems);

router.put(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(ItemValidations.updateItemValidationSchema),
  ItemControllers.updateItem,
);

router.delete('/:id', auth(USER_ROLE.user), ItemControllers.deleteItem);

export const ListingRoutes = router;
