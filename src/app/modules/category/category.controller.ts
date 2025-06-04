import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category is created successfully!',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Categories are retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryServices.getSingleCategoryFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category is got successfully!',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryServices.updateCategoryInDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category is updated successfully!',
    data: result,
  });
});

const deleteSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  await CategoryServices.deleteSingleCategoryFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category is deleted successfully!',
    data: {},
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteSingleCategory,
};
