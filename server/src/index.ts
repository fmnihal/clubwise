import cookieParser from 'cookie-parser';
import express from 'express';
import { MongoDb } from './models/mongodb/driver';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import postRoutes from './routes/post';
import clubApplyRoutes from './routes/clubApproval';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}))
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/club/post", postRoutes);
app.use("/v1/api/club/application", clubApplyRoutes);
app.use("/v1/api/user", userRoutes);

// Initialize Database
MongoDb.init(process.env.MONGODB_URL as string, "clubwise-dev");

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
