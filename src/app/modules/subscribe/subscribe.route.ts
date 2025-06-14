import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import { SubscribeValidations } from './subscribe.validation';
import { SubscribeControllers } from './subscribe.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(SubscribeValidations.createSubscribeValidationSchema),
  SubscribeControllers.createSubscribe,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  SubscribeControllers.getAllSubscribedUsers,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  SubscribeControllers.deleteSubscriber,
);

export const SubscribeRoutes = router;
