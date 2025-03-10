import QueryBuilder from '../../builder/QueryBuilder';
import { TITem } from './item.interface';
import { ItemModel } from './item.model';

const createItemIntoDB = async (payload: TITem, sellerId: string) => {
  const result = await ItemModel.create({ ...payload, sellerId });

  return result;
};

const getAllItemsFromDB = async (query: Record<string, unknown>) => {
  const ItemSearchableFields = [
    'title',
    'description',
    'category',
    'condition',
    'location',
  ];

  const ItemQuery = new QueryBuilder(ItemModel.find(), query)
    .search(ItemSearchableFields)
    .filter()
    .priceFilter();

  const result = await ItemQuery.modelQuery;

  // const result = await ItemModel.find();

  return result;
};

const getSingleItemFromDB = async (id: string) => {
  const result = await ItemModel.findById(id);

  return result;
};

const updateItemInDB = async (id: string, itemDataData: Partial<TITem>) => {
  const result = await ItemModel.findByIdAndUpdate(id, itemDataData, {
    new: true,
  });

  return result;
};

const deleteSingleItemFromDB = async (id: string) => {
  const result = await ItemModel.findByIdAndDelete(id, {
    new: true,
  });

  return result;
};

export const ItemServices = {
  createItemIntoDB,
  getAllItemsFromDB,
  getSingleItemFromDB,
  updateItemInDB,
  deleteSingleItemFromDB,
};
