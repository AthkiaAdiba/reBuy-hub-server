import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TITem } from './item.interface';
import { ItemModel } from './item.model';
import { User } from '../auth/auth.model';

const createItemIntoDB = async (payload: TITem, sellerId: string) => {
  const result = await ItemModel.create({ ...payload, sellerId });

  return result;
};

const getAllItemsFromDB = async (query: Record<string, unknown>) => {
  const ItemSearchableFields = [
    'title',
    'description',
    'condition',
    'location',
  ];

  const ItemQuery = new QueryBuilder(ItemModel.find(), query)
    .search(ItemSearchableFields)
    .priceFilter()
    .filter();

  const result = await ItemQuery.modelQuery;

  // const result = await ItemModel.find();

  return result;
};

const getAllItemsOfOwnerFromDB = async (sellerId: string) => {
  const user = await User.findById(sellerId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not exists!');
  }
  const result = await ItemModel.find({ sellerId: user?._id });
  return result;
};

const getSingleItemFromDB = async (id: string) => {
  const result = await ItemModel.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This item is not exists!');
  }

  return result;
};

const updateItemInDB = async (id: string, itemDataData: Partial<TITem>) => {
  const item = await ItemModel.findById(id);

  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This item is not exists!');
  }

  const result = await ItemModel.findByIdAndUpdate(id, itemDataData, {
    new: true,
  });

  return result;
};

const updateItemStatusInDB = async (id: string) => {
  const item = await ItemModel.findById(id);

  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This item is not exists!');
  }

  const result = await ItemModel.findByIdAndUpdate(
    id,
    { status: 'sold' },
    {
      new: true,
    },
  );

  return result;
};

const deleteSingleItemFromDB = async (id: string) => {
  const item = await ItemModel.findById(id);

  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This item is not exists!');
  }

  const result = await ItemModel.findByIdAndDelete(id, {
    new: true,
  });

  return result;
};

export const ItemServices = {
  createItemIntoDB,
  getAllItemsFromDB,
  getAllItemsOfOwnerFromDB,
  getSingleItemFromDB,
  updateItemInDB,
  updateItemStatusInDB,
  deleteSingleItemFromDB,
};
