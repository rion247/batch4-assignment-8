import z from 'zod';

const customerValidationSchemaforCreate = z.object({
  body: z.object({
    name: z
      .string('Customer Name must be a string')
      .nonempty('Customer Name is required'),
    email: z
      .string('Email Address must be a string')
      .nonempty('Email Address is required'),
    phone: z
      .string('Contact Number must be a string')
      .nonempty('Contact Number is required'),
  }),
});

const customerValidationSchemaforUpdate = z.object({
  body: z
    .object({
      name: z
        .string('Customer Name must be a string')
        .nonempty('Customer Name is required')
        .optional(),

      phone: z
        .string('Contact Number must be a string')
        .nonempty('Contact Number is required')
        .optional(),
    })
    .strict()
    .superRefine((val, ctx) => {
      const allowedKeys = ['name', 'phone'];
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

export const CustomerValidationSchemas = {
  customerValidationSchemaforCreate,
  customerValidationSchemaforUpdate,
};
