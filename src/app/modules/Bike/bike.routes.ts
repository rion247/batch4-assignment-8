import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeController } from './bike.controller';
import { BikeValidationSchemas } from './bike.validations';

const router = express.Router();

router.post(
  '/',
  validateRequest(BikeValidationSchemas.bikeValidationSchemaforCreate),
  BikeController.createSingleBike,
);

router.get('/:id', BikeController.getSingleBike);

router.get('/', BikeController.getAllBikes);

export const BikeRoutes = router;
