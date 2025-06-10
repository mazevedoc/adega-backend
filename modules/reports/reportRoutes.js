import express from 'express';
import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';
import * as reportController from './reportController.js';

const router = express.Router();

// Relatórios geralmente são restritos a papéis de gestão
const papeisAutorizados = ['admin', 'gerente'];


router.get(
    '/resumo',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    reportController.getResumo);

router.get('/vendas-mes',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    reportController.getVendasPorMes);

router.get('/ultimas-vendas',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    reportController.getUltimasVendas);

router.get('/produtos',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    reportController.getResumoDeProdutos);

router.get('/ranking-produtos',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    reportController.getRankingDeProdutos);

router.get('/vendas-por-periodo',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    reportController.getVendasPorPeriodo);

export default router;