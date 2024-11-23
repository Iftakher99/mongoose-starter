import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.route';
const app: Application = express();

// const port = 3000;
//parser
app.use(express.json());
app.use(cors());

//app routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req, res) => {
  const a = 200;
  res.sendStatus(a);
});

export default app;
