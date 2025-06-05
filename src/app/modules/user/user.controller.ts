import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { UserServices } from './user.service';

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users are retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.getSingleIUserFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User got successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  const result = await UserServices.updateUserInDB(id, userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is updated successfully!',
    data: result,
  });
});

const changeRoleAndStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  const result = await UserServices.changeRoleAndStatusInDB(id, userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is updated successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.deleteSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is deleted successfully!',
    data: result,
  });
});

const banUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.banUserIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is banned successfully!',
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  banUser,
  changeRoleAndStatus,
};
