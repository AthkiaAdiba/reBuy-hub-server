import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review is created successfully!',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reviews are retrieved successfully!',
    data: result,
  });
});

const getAllIReviewsGivenOnMyProduct = catchAsync(async (req, res) => {
  const { userId: sellerId } = req.user;
  const result =
    await ReviewServices.getAllIReviewsGivenOnMyProductFromDB(sellerId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reviews are retrieved successfully!',
    data: result,
  });
});

const getAllIMyReviews = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await ReviewServices.getAllIMyReviewsFromDB(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reviews are retrieved successfully!',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ReviewServices.getSingleReviewFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review is got successfully!',
    data: result,
  });
});

const getAllProductReviews = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ReviewServices.getAllProductReviewsFromDB(id, req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reviews are got successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ReviewServices.updateReviewInDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review is updated successfully!',
    data: result,
  });
});

const updateReviewStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ReviewServices.updateReviewStatusInDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review status is updated successfully!',
    data: result,
  });
});

const deleteSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;

  await ReviewServices.deleteSingleReviewFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review is deleted successfully!',
    data: {},
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
  getAllIReviewsGivenOnMyProduct,
  getAllIMyReviews,
  getSingleReview,
  updateReview,
  updateReviewStatus,
  deleteSingleReview,
  getAllProductReviews,
};
