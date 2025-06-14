/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const ItemQuery = new QueryBuilder(
    ItemModel.find().populate('category'),
    query,
  )
    .search(ItemSearchableFields)
    .priceFilter()
    .sort()
    .filter()
    .paginate();

  const meta = await ItemQuery.countTotal();
  const result = await ItemQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getAllItemsOfOwnerFromDB = async (sellerId: string, query: any) => {
  const user = await User.findById(sellerId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not exists!');
  }

  const baseQuery = ItemModel.find({ sellerId: user?._id }).populate(
    'category',
  );

  const ItemQuery = new QueryBuilder(baseQuery, query).sort().paginate();

  const meta = await ItemQuery.countTotal();
  const result = await ItemQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleItemFromDB = async (id: string) => {
  const result = await ItemModel.findById(id).populate('category');

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
  }).populate('category');

  return result;
};

const addOfferPriceInDB = async (id: string, offerPrice: Partial<TITem>) => {
  const item = await ItemModel.findById(id);

  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This item is not exists!');
  }

  const result = await ItemModel.findByIdAndUpdate(id, offerPrice, {
    new: true,
  }).populate('category');

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
  ).populate('category');

  return result;
};

const deleteSingleItemFromDB = async (id: string) => {
  const item = await ItemModel.findById(id);

  if (!item) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This item is not exists!');
  }

  const result = await ItemModel.findByIdAndDelete(id, {
    new: true,
  }).populate('category');

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
  addOfferPriceInDB,
};
