import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TransactionServices } from './transaction.service';

const createTransaction = catchAsync(async (req, res) => {
  const buyerId = req?.user?.userId;
  const result = await TransactionServices.createTransactionIntoDB(
    buyerId,
    req.body,
    req.ip!,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction created successfully!',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const result = await TransactionServices.verifyPayment(
    req.query.order_id as string,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction verified successfully!',
    data: result,
  });
});

const getMyPurchaseHistory = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await TransactionServices.getMyPurchaseHistoryFromDB(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My purchase History got successfully!',
    data: result,
  });
});

export const TransactionControllers = {
  createTransaction,
  verifyPayment,
  getMyPurchaseHistory,
};
