import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// parsers
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://rebuy-hub-client-new2.vercel.app',
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

// application routes
app.use('/', router);

const test = async (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', test);

app.use(globalErrorHandler);

// NOT Found
app.use(notFound);

export default app;

// it is a http-status
// npm i @types/http-status
