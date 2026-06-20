import type { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ServiceRecordService } from './serviceRecord.service';
import pick from '../../../shared/pick';
import { serviceRecordFilterAbleFields } from './serviceRecord.constant';

const createSingleServiceRecord = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ServiceRecordService.createServiceRecordInToDB(
      req.body,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Service record created successfully',
      data: result,
    });
  },
);

const getAllServiceRecord = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceRecordFilterAbleFields);

  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await ServiceRecordService.getAllServiceRecordsFromDB(
    filters,
    options,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service records fetched successfully',
    data: result?.data,
  });
});

const getSingleServiceRecord = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ServiceRecordService.getSingleServiceRecordByIDFromDB(
      id as string,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Service record fetched successfully',
      data: result,
    });
  },
);

const updateSingleServiceRecord = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await ServiceRecordService.updateSingleServiceRecordInformationByIDFromDB(
        id as string,
        req.body,
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Service marked as completed',
      data: result,
    });
  },
);

const getAllPendingServiceRecords = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, serviceRecordFilterAbleFields);

    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await ServiceRecordService.getAllPendingServiceRecordsFromDB(
      filters,
      options,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Overdue or pending services fetched successfully',
      data: result?.data,
    });
  },
);

export const ServiceRecordController = {
  createSingleServiceRecord,
  getAllServiceRecord,
  getSingleServiceRecord,
  updateSingleServiceRecord,
  getAllPendingServiceRecords,
};
