import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceRecordValidationSchemas } from './serviceRecord.validations';
import { ServiceRecordController } from './serviceRecord.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(
    ServiceRecordValidationSchemas.serviceRecordValidationSchemaforCreate,
  ),
  ServiceRecordController.createSingleServiceRecord,
);

router.put(
  '/:id',
  validateRequest(
    ServiceRecordValidationSchemas.serviceRecordValidationSchemaforUpdate,
  ),
  ServiceRecordController.updateSingleServiceRecord,
);

router.get('/status', ServiceRecordController.getAllPendingServiceRecords);

router.get('/:id', ServiceRecordController.getSingleServiceRecord);

router.get('/', ServiceRecordController.getAllServiceRecord);

export const ServiceRecordRoutes = router;
