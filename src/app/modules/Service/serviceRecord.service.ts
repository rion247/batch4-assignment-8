/* eslint-disable @typescript-eslint/no-explicit-any */

import { ServiceStatus, type Prisma } from '@prisma/client';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import type { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import type {
  TServiceRecord,
  TServiceRecordFilterRequest,
} from './serviceRecord.interface';
import { serviceRecordSearchAbleFields } from './serviceRecord.constant';

const createServiceRecordInToDB = async (payload: TServiceRecord) => {
  const result = await prisma.serviceRecord.create({
    data: { ...payload },
  });

  return result;
};

const getAllServiceRecordsFromDB = async (
  query: TServiceRecordFilterRequest,
  options: IPaginationOptions,
) => {
  const { searchTerm, ...filterAbleData } = query;

  const { page, limit, skip } = PaginationHelper.calculatePagination(options);

  const andConditions: Prisma.ServiceRecordWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceRecordSearchAbleFields.map((field) => ({
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

  const whereCondition = { AND: andConditions };

  const result = await prisma.serviceRecord.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      bike: true,
    },
  });

  const total = await prisma.serviceRecord.count({
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

const getSingleServiceRecordByIDFromDB = async (id: string) => {
  const result = await prisma.serviceRecord.findUniqueOrThrow({
    where: {
      serviceId: id,
    },
    include: {
      bike: true,
    },
  });

  return result;
};

const updateSingleServiceRecordInformationByIDFromDB = async (
  id: string,
  updateData: Partial<TServiceRecord>,
) => {
  const { completionDate } = updateData;

  await prisma.serviceRecord.findUniqueOrThrow({
    where: {
      serviceId: id,
    },
  });

  const result = await prisma.serviceRecord.update({
    where: {
      serviceId: id,
    },
    data: {
      status: ServiceStatus.done,
      completionDate: completionDate ? completionDate : new Date(),
    },
  });

  return result;
};

const getAllPendingServiceRecordsFromDB = async (
  query: TServiceRecordFilterRequest,
  options: IPaginationOptions,
) => {
  const { searchTerm, ...filterAbleData } = query;

  const { page, limit, skip } = PaginationHelper.calculatePagination(options);

  const andConditions: Prisma.ServiceRecordWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceRecordSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  //{email: 'test@gmail.com', name: 'test' } key : email , value: 'test@gmail.com'
  // [key] = email
  // Object.keys() -> [email, name] -> map -> key = email , key = name
  // [key] --> email [key] -> name
  // Array loop করলে item = value
  // Object.keys loop করলে item = key(name)

  if (Object.keys(filterAbleData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterAbleData).map((key) => ({
        [key]: {
          equals: (filterAbleData as any)[key],
        },
      })),
    });
  }

  andConditions.push({
    status: { in: [ServiceStatus.pending, ServiceStatus.in_progress] },
  });

  // 20 june 26 - 7 = 13june > 12,11,10

  andConditions.push({
    serviceDate: {
      lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  });

  const whereCondition: Prisma.ServiceRecordWhereInput = { AND: andConditions };

  const result = await prisma.serviceRecord.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      bike: true,
    },
  });

  const total = await prisma.serviceRecord.count({
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

export const ServiceRecordService = {
  createServiceRecordInToDB,
  getAllServiceRecordsFromDB,
  getSingleServiceRecordByIDFromDB,
  updateSingleServiceRecordInformationByIDFromDB,
  getAllPendingServiceRecordsFromDB,
};
