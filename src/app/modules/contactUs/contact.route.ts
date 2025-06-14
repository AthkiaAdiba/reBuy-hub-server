import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import { ContactValidations } from './contact.validation';
import { ContactControllers } from './contact.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ContactValidations.createContactValidationSchema),
  ContactControllers.createContact,
);

router.get('/', auth(USER_ROLE.admin), ContactControllers.getAllContacts);

router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ContactControllers.getSingleContact,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(ContactValidations.updateContactValidationSchema),
  ContactControllers.updateContact,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ContactControllers.deleteSingleContact,
);

export const ContactRoutes = router;
