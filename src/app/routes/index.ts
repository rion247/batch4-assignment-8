import express from 'express';
import { CustomerRoutes } from '../modules/Customer/customer.routes';
import { BikeRoutes } from '../modules/Bike/bike.routes';
import { ServiceRecordRoutes } from './../modules/Service/serviceRecord.routes';

const router = express.Router();

const moduleRoutes = [
  { path: '/customers', route: CustomerRoutes },
  { path: '/bikes', route: BikeRoutes },
  { path: '/services', route: ServiceRecordRoutes },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
