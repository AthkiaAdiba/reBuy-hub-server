/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TContact } from './contact.interface';
import { ContactModel } from './contact.model';

const createContactIntoDB = async (payload: TContact) => {
  const result = await ContactModel.create(payload);

  return result;
};

const getAllContactsFromDB = async (query: any) => {
  const ContactQuery = new QueryBuilder(ContactModel.find(), query)
    .sort()
    .paginate();

  const meta = await ContactQuery.countTotal();
  const result = await ContactQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleContactFromDB = async (contactId: string) => {
  const result = await ContactModel.findById(contactId);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This contact is not exists!');
  }

  return result;
};

const updateContactInDB = async (
  contactId: string,
  contactData: Partial<TContact>,
) => {
  const contact = await ContactModel.findById(contactId);

  if (!contact) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This contact is not exists!');
  }

  const result = await ContactModel.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });

  return result;
};

const deleteSingleContactFromDB = async (id: string) => {
  const contact = await ContactModel.findById(id);

  if (!contact) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This contact is not exists!');
  }

  const result = await ContactModel.findByIdAndDelete(id, {
    new: true,
  });

  return result;
};

export const ContactServices = {
  createContactIntoDB,
  getAllContactsFromDB,
  getSingleContactFromDB,
  updateContactInDB,
  deleteSingleContactFromDB,
};
