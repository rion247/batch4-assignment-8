import z from 'zod';

const serviceRecordValidationSchemaforCreate = z.object({
  body: z.object({
    bikeId: z
      .string('Bike ID must be a string')
      .nonempty('Bike ID is required'),
    serviceDate: z
      .string('Bike Service Date must be a string')
      .nonempty('Bike Service Date is required'),
    description: z
      .string('Bike Description must be a string')
      .nonempty('Bike Description is required'),
  }),
});

const serviceRecordValidationSchemaforUpdate = z.object({
  body: z
    .object({
      completionDate: z.iso
        .datetime('Bike Service Completion Date must in date time format')
        .nonempty('Bike Service Completion Date must is required')
        .optional(),
    })
    .strict()
    .superRefine((val, ctx) => {
      const allowedKeys = ['completionDate'];
      Object.keys(val).forEach((key) => {
        if (!allowedKeys.includes(key)) {
          ctx.addIssue({
            code: 'custom',
            message: `Update request for ${key} failed!!!`,
            path: [key],
          });
        }
      });
    }),
});

export const ServiceRecordValidationSchemas = {
  serviceRecordValidationSchemaforCreate,
  serviceRecordValidationSchemaforUpdate,
};
