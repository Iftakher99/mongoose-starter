import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import notFound from './app/middlewares/notFound';

import router from './app/routes';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//app routes
app.use('/api/v1', router);

app.get('/', (req, res) => {
  const a = 200;
  res.sendStatus(a);
});

app.use(globalErrorHandler);
//Not Found
app.use(notFound);
export default app;
