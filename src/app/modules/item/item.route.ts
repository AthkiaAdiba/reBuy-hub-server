import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import { ItemValidations } from './item.validation';
import { ItemControllers } from './item.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(ItemValidations.createItemValidationSchema),
  ItemControllers.createItem,
);

router.get(
  '/owner-items',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ItemControllers.getAllItemsOfOwner,
);

router.get('/:id', ItemControllers.getSingleItem);

router.get('/', ItemControllers.getAllItems);

router.put(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(ItemValidations.updateItemValidationSchema),
  ItemControllers.updateItem,
);

router.patch(
  '/:id/offer-price',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(ItemValidations.addOrRemoveOfferPriceValidationSchema),
  ItemControllers.addOfferPrice,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ItemControllers.deleteItem,
);

export const ListingRoutes = router;
