import express from 'express';
import cors from 'cors';
import rotas from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

// Central de rotas
app.use('/api', rotas);

export default app;