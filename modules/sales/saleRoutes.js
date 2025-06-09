import express from 'express';
import { autenticarToken } from '../../middlewares/authMiddleware.js';
import { validarErros } from '../../middlewares/validationMiddleware.js';
import { regrasDeVenda } from './saleValidator.js';
import * as saleController from './saleController.js';

const router = express.Router();

// Rota para criar uma nova venda
router.post(
    '/',
    autenticarToken, // Apenas usuários logados podem registrar vendas
    regrasDeVenda,
    validarErros,
    saleController.registrarNovaVenda
);

// (No futuro, você terá rotas GET para listar vendas, buscar por ID, etc.)

export default router;