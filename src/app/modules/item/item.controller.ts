import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ItemServices } from './item.service';

const createItem = catchAsync(async (req, res) => {
  const { userId: sellerId } = req.user;
  const itemData = req.body;

  const result = await ItemServices.createItemIntoDB(itemData, sellerId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Item is created successfully!',
    data: result,
  });
});

const getAllItems = catchAsync(async (req, res) => {
  const result = await ItemServices.getAllItemsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Items are retrieved successfully!',
    data: result,
  });
});

const getSingleItem = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ItemServices.getSingleItemFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Item is retrieved successfully!',
    data: result,
  });
});

const updateItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemData = req.body;

  const result = await ItemServices.updateItemInDB(id, itemData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product is updated successfully!',
    data: result,
  });
});

const deleteItem = catchAsync(async (req, res) => {
  const { id } = req.params;

  await ItemServices.deleteSingleItemFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Item is deleted successfully!',
    data: {},
  });
});

export const ItemControllers = {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
};
