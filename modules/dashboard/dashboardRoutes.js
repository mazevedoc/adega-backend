import express from 'express';
import { autenticarToken } from '../../middlewares/authMiddleware.js';
import { obterResumo, obterVendasPorMes, obterProdutosResumo, obterUltimasVendas } from './dashboardController.js';

const router = express.Router();

// Dashboard
router.get('/resumo', autenticarToken, obterResumo);
router.get('/vendas-mes', autenticarToken, obterVendasPorMes);
router.get('/ultimas-vendas', autenticarToken, obterUltimasVendas);
router.get('/produtos', autenticarToken, obterProdutosResumo);

export default router;