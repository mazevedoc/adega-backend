import express from 'express';
import {
    getTodosProdutos,
    getProdutoPorId,
    postNovoProduto,
    putProduto,
    deleteProduto
} from './productController.js';

import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';

const router = express.Router();

const papeisAutorizados = ['admin', 'gerente'];

router.get('/', getTodosProdutos);
router.get('/:id', getProdutoPorId);

router.post(
    '/',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    postNovoProduto
);

router.put(
    '/:id',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    putProduto
);

router.delete(
    '/:id',
    autenticarToken,
    autorizarPorPapel('admin'),
    deleteProduto
);

export default router;