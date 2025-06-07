import express from 'express';
import cors from 'cors';
import rotas from './routes/index.js';
import manipuladorDeErroGlobal from './middlewares/errorMiddleware.js';
import ErroAplicacao from './utils/appError.js';

const app = express();

app.use(cors());
app.use(express.json());

// Central de rotas
app.use('/api/v1', rotas);

// tratar rotas não encontradas (404)
app.use((req, res, next) => {
  next(new ErroAplicacao(`Não foi possível encontrar a rota ${req.originalUrl} neste servidor!`, 404));
});

app.use(manipuladorDeErroGlobal);

export default app;