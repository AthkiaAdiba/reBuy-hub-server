import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import { TransactionControllers } from './transaction.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.createTransaction,
);

router.get(
  '/verify',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.verifyPayment,
);

router.get(
  '/purchases/:userId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.getMyPurchaseHistory,
);

export const TransactionRoutes = router;
