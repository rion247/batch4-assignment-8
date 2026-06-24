/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../shared/prisma';
import { customerSearchAbleFields } from './customer.constant';
import type { TCustomer, TCustomerFilterRequest } from './customer.interface';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import { Prisma } from '@prisma/client';
import type { IPaginationOptions } from '../../../interfaces/pagination';

const createSingleCustomerInToDB = async (payload: TCustomer) => {
  const result = await prisma.customer.create({
    data: { ...payload },
  });

  return result;
};

const getAllCustomersFromDB = async (
  query: TCustomerFilterRequest,
  options: IPaginationOptions,
) => {
  const { searchTerm, ...filterAbleData } = query;

  const { page, limit, skip } = PaginationHelper.calculatePagination(options);

  const andConditions: Prisma.CustomerWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: customerSearchAbleFields.map((field) => ({
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

  const whereCondition: Prisma.CustomerWhereInput = { AND: andConditions };

  const result = await prisma.customer.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.customer.count({
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

const getSingleCustomerByIDFromDB = async (id: string) => {
  const result = await prisma.customer.findUniqueOrThrow({
    where: {
      customerId: id,
    },
  });

  return result;
};

const updateSingleCustomerInformationByIDFromDB = async (
  id: string,
  updateData: Partial<TCustomer>,
) => {
  await prisma.customer.findUniqueOrThrow({
    where: {
      customerId: id,
    },
  });

  const result = await prisma.customer.update({
    where: {
      customerId: id,
    },
    data: { ...updateData },
  });

  return result;
};

const deleteSingleCustomerByIDFromDB = async (id: string) => {
  await prisma.customer.findUniqueOrThrow({
    where: {
      customerId: id,
    },
  });

  const result = await prisma.customer.delete({
    where: {
      customerId: id,
    },
  });

  return result;
};

export const CustomerService = {
  createSingleCustomerInToDB,
  getAllCustomersFromDB,
  getSingleCustomerByIDFromDB,
  updateSingleCustomerInformationByIDFromDB,
  deleteSingleCustomerByIDFromDB,
};
