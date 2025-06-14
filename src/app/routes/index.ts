import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ListingRoutes } from '../modules/item/item.route';
import { UserRoutes } from '../modules/user/user.route';
import { TransactionRoutes } from '../modules/transaction/transaction.route';
import { SubscribeRoutes } from '../modules/subscribe/subscribe.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ContactRoutes } from '../modules/contactUs/contact.route';
import { OverviewRoutes } from '../modules/overview/overview.route';

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
  {
    path: '/subscribe',
    route: SubscribeRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/contact-us',
    route: ContactRoutes,
  },
  {
    path: '/overview',
    route: OverviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
