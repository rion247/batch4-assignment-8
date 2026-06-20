import z from 'zod';

const bikeValidationSchemaforCreate = z.object({
  body: z.object({
    brand: z
      .string('Bike Brand Name must be a string')
      .nonempty('Bike Brand Name is required'),
    model: z
      .string('Bike Model must be a string')
      .nonempty('Bike Model is required'),
    year: z.number({ error: 'Year is required' }),
    customerId: z
      .string('Customer ID must be a string')
      .nonempty('Customer ID is required'),
  }),
});

export const BikeValidationSchemas = {
  bikeValidationSchemaforCreate,
};
