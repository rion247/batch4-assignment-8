import express, { type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send({
    Message: 'Bike Servicing Management App!',
  });
});

app.use('/api', router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
