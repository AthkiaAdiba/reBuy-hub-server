import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { OverviewServices } from './overview.service';

const adminOverview = catchAsync(async (req, res) => {
  const result = await OverviewServices.adminOverviewFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin overviews are retrieved successfully!',
    data: result,
  });
});

const userOverview = catchAsync(async (req, res) => {
  const { userId: sellerId } = req.user;
  const result = await OverviewServices.userOverviewFromDB(sellerId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User overviews are retrieved successfully!',
    data: result,
  });
});

export const OverviewControllers = {
  adminOverview,
  userOverview,
};
