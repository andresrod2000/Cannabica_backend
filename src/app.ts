import express, { Application } from 'express';
import cors from 'cors';
import userRouter from './routers/userRoute';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Llamar al router de usuario
app.use('/api', userRouter);

export default app;