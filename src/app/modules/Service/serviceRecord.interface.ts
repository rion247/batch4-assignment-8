import type { ServiceStatus } from '@prisma/client';

export type TServiceRecord = {
  bikeId: string;
  serviceDate: Date;
  completionDate?: Date;
  description: string;
  status: ServiceStatus;
};

export type TServiceRecordFilterRequest = {
  serviceDate?: Date | undefined;
  description?: string | undefined;
  status?: ServiceStatus | undefined;
  searchTerm?: string | undefined;
};
