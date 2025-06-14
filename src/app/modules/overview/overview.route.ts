import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import { OverviewControllers } from './overview.controller';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), OverviewControllers.adminOverview);

router.get('/user', auth(USER_ROLE.user), OverviewControllers.userOverview);

export const OverviewRoutes = router;
