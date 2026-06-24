/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import type { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import type { TBike, TBikeFilterRequest } from './bike.interface';
import { bikeFiltersAbleFields } from './bike.constant';

const createSingleBikeInToDB = async (payload: TBike) => {
  const result = await prisma.bike.create({
    data: { ...payload },
  });

  return result;
};

const getAllBikesFromDB = async (
  query: TBikeFilterRequest,
  options: IPaginationOptions,
) => {
  const { searchTerm, ...filterAbleData } = query;

  const { page, limit, skip } = PaginationHelper.calculatePagination(options);

  const andConditions: Prisma.BikeWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: bikeFiltersAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterAbleData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterAbleData).map((key) => ({
        [key]: {
          equals: (filterAbleData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.BikeWhereInput = { AND: andConditions };

  const result = await prisma.bike.findMany({
    where: whereCondition,
    skip,
    take: limit,
    select: {
      //select and include method works same
      bikeId: true,
      brand: true,
      model: true,
      year: true,
      customer: true,
    },
  });

  const total = await prisma.bike.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBikeByIDFromDB = async (id: string) => {
  const result = await prisma.bike.findUniqueOrThrow({
    where: {
      bikeId: id,
    },
    include: {
      customer: true,
    },
  });

  return result;
};

export const BikeService = {
  getSingleBikeByIDFromDB,
  getAllBikesFromDB,
  createSingleBikeInToDB,
};
