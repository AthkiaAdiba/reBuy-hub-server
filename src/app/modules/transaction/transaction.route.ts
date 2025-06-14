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
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.getAllPaidTransactions,
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

router.get(
  '/sales/:userId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.getMySalesHistory,
);

router.put(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.updateTransactionStatus,
);

export const TransactionRoutes = router;
