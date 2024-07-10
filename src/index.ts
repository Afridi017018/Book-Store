import express, { Request, Response, NextFunction } from 'express'; // Import types for Request, Response, and NextFunction
import dotenv from 'dotenv';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', authorRoutes);
app.use('/api', bookRoutes);

app.use((req: Request, res: Response, next: NextFunction) => { // Explicitly type parameters
  res.status(404).json({ error: 'Not Found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => { // Explicitly type parameters
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
