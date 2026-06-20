import type { BikeBrand } from '@prisma/client';

export type TBike = {
  brand: BikeBrand;
  model: string;
  year: number;
  customerId: string;
};

export type TBikeFilterRequest = {
  brand?: BikeBrand | undefined;
  model?: string | undefined;
  year?: number | undefined;
  searchTerm?: string | undefined;
};
