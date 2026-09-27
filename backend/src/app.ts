import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CyberNexo API' });
});

export default app;
