import type { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CustomerService } from './customer.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { customerFiltersAbleFields } from './customer.constant';

const createSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerService.createSingleCustomerInToDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFiltersAbleFields);

  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await CustomerService.getAllCustomersFromDB(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customers fetched successfully',
    data: result?.data,
  });
});

const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CustomerService.getSingleCustomerByIDFromDB(
    id as string,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer fetched successfully',
    data: result,
  });
});

const updateSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result =
    await CustomerService.updateSingleCustomerInformationByIDFromDB(
      id as string,
      req.body,
    );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer updated successfully',
    data: result,
  });
});

const deleteSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await CustomerService.deleteSingleCustomerByIDFromDB(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Customer deleted successfully',
  });
});

export const CustomerController = {
  createSingleCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateSingleCustomer,
  deleteSingleCustomer,
};
