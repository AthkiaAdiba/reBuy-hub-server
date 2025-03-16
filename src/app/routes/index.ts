import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ListingRoutes } from '../modules/item/item.route';
import { UserRoutes } from '../modules/user/user.route';
import { TransactionRoutes } from '../modules/transaction/transaction.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/listings',
    route: ListingRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/transactions',
    route: TransactionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
