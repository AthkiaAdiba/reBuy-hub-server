import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ContactServices } from './contact.service';

const createContact = catchAsync(async (req, res) => {
  const result = await ContactServices.createContactIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Message has received successfully!',
    data: result,
  });
});

const getAllContacts = catchAsync(async (req, res) => {
  const result = await ContactServices.getAllContactsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Contacts are retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ContactServices.getSingleContactFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Contact is got successfully!',
    data: result,
  });
});

const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ContactServices.updateContactInDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Contact is updated successfully!',
    data: result,
  });
});

const deleteSingleContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await ContactServices.deleteSingleContactFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Contact is deleted successfully!',
    data: {},
  });
});

export const ContactControllers = {
  createContact,
  getAllContacts,
  getSingleContact,
  updateContact,
  deleteSingleContact,
};
