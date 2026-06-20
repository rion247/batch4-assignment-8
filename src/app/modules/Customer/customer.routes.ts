import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerValidationSchemas } from './customer.validations';
import { CustomerController } from './customer.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(CustomerValidationSchemas.customerValidationSchemaforCreate),
  CustomerController.createSingleCustomer,
);

router.put(
  '/:id',
  validateRequest(CustomerValidationSchemas.customerValidationSchemaforUpdate),
  CustomerController.updateSingleCustomer,
);

router.delete('/:id', CustomerController.deleteSingleCustomer);

router.get('/:id', CustomerController.getSingleCustomer);

router.get('/', CustomerController.getAllCustomers);

export const CustomerRoutes = router;
