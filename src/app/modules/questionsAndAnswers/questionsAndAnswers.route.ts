// import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../auth/auth.constant';

// const router = express.Router();

// router.post(
//   '/',
//   validateRequest(ReviewValidations.createReviewValidationSchema),
//   ReviewControllers.createReview,
// );

// router.get(
//   '/my-products-review',
//   auth(USER_ROLE.user, USER_ROLE.admin),
//   ReviewControllers.getAllIReviewsGivenOnMyProduct,
// );

// router.get(
//   '/my-reviews',
//   auth(USER_ROLE.user, USER_ROLE.admin),
//   ReviewControllers.getAllIMyReviews,
// );

// router.get('/product-reviews/:id', ReviewControllers.getAllProductReviews);

// router.get('/:id', ReviewControllers.getSingleReview);

// router.get('/', auth(USER_ROLE.admin), ReviewControllers.getAllReviews);

// router.put(
//   '/:id',
//   auth(USER_ROLE.user, USER_ROLE.admin),
//   validateRequest(ReviewValidations.updateReviewValidationSchema),
//   ReviewControllers.updateReview,
// );

// router.patch(
//   '/:id/status-change',
//   auth(USER_ROLE.admin),
//   ReviewControllers.updateReviewStatus,
// );

// router.delete(
//   '/:id',
//   auth(USER_ROLE.user, USER_ROLE.admin),
//   ReviewControllers.deleteSingleReview,
// );

// export const ReviewRoutes = router;
