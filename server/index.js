import express from 'express';
import cors from 'cors';
import prisma from './db/connection.js';
import authRoutes from './routes/authRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is runnning on http://localhost:${PORT}`);
})