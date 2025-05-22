import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { SubscribeServices } from './subscribe.service';

const createSubscribe = catchAsync(async (req, res) => {
  const result = await SubscribeServices.createSubscribeIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'You are subscribed now!',
    data: result,
  });
});

const getAllSubscribedUsers = catchAsync(async (req, res) => {
  const result = await SubscribeServices.getAllSubscribesUsersFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All subscribed users are retrieved successfully!',
    data: result,
  });
});

export const SubscribeControllers = {
  createSubscribe,
  getAllSubscribedUsers,
};
