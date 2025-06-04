/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TCategory } from './category.interface';
import { CategoryModel } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const isAlreadyExists = await CategoryModel.findOne({
    categoryName: payload.categoryName,
  });

  if (isAlreadyExists) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This category is already included!',
    );
  }

  const result = await CategoryModel.create(payload);

  return result;
};

const getAllCategoriesFromDB = async (query: any) => {
  const CategoryQuery = new QueryBuilder(CategoryModel.find(), query)
    .sort()
    .paginate();

  const meta = await CategoryQuery.countTotal();
  const result = await CategoryQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleCategoryFromDB = async (categoryId: string) => {
  const result = await CategoryModel.findById(categoryId);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This category is not exists!');
  }

  return result;
};

const updateCategoryInDB = async (
  categoryId: string,
  categoryData: Partial<TCategory>,
) => {
  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Category is not exists!');
  }

  const result = await CategoryModel.findByIdAndUpdate(
    categoryId,
    categoryData,
    {
      new: true,
    },
  );

  return result;
};

const deleteSingleCategoryFromDB = async (id: string) => {
  const category = await CategoryModel.findById(id);

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Category is not exists!');
  }

  const result = await CategoryModel.findByIdAndDelete(id, {
    new: true,
  });

  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryInDB,
  deleteSingleCategoryFromDB,
};
