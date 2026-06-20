import type { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BikeService } from './bike.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { bikeFiltersAbleFields } from './bike.constant';

const createSingleBike = catchAsync(async (req: Request, res: Response) => {
  const result = await BikeService.createSingleBikeInToDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bikeFiltersAbleFields);

  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await BikeService.getAllBikesFromDB(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bikes fetched successfully',
    data: result?.data,
  });
});

const getSingleBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BikeService.getSingleBikeByIDFromDB(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bike fetched successfully',
    data: result,
  });
});

export const BikeController = {
  createSingleBike,
  getAllBikes,
  getSingleBike,
};
