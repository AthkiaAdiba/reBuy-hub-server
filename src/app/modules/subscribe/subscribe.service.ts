/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TSubscribe } from './subscribe.interface';
import { SubscribeModel } from './subscribe.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSubscribeIntoDB = async (payload: TSubscribe) => {
  const isAlreadySubscribe = await SubscribeModel.findOne({
    userEmail: payload.userEmail,
  });

  if (isAlreadySubscribe) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You have already subscribed!');
  }

  const result = await SubscribeModel.create(payload);

  return result;
};

const getAllSubscribesUsersFromDB = async (query: any) => {
  const SubscribersQuery = new QueryBuilder(SubscribeModel.find(), query)
    .sort()
    .paginate();

  const meta = await SubscribersQuery.countTotal();
  const result = await SubscribersQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const deleteSubscribeFromDB = async (id: string) => {
  const subscriber = await SubscribeModel.findById(id);

  if (!subscriber) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This subscriber is not exists!');
  }

  const result = await SubscribeModel.findByIdAndDelete(id, {
    new: true,
  });

  return result;
};

export const SubscribeServices = {
  createSubscribeIntoDB,
  getAllSubscribesUsersFromDB,
  deleteSubscribeFromDB,
};
