import express from 'express';
import * as productController from './productController.js';
import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';
import { validarErros } from '../../middlewares/validationMiddleware.js';
import { validarProduto, validarId } from './productValidator.js';

const router = express.Router();

const papeisAutorizados = ['admin', 'gerente'];

router.get('/', productController.getProdutos);

router.get('/:id', validarId, validarErros, productController.getProdutoPorId);

router.post(
    '/',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    validarProduto,
    validarErros,
    productController.postNovoProduto
);

router.put(
    '/:id',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    validarId,
    validarProduto,
    validarErros,
    productController.putProduto
);

router.delete(
    '/:id',
    autenticarToken,
    autorizarPorPapel('admin'),
    validarId,
    validarErros,
    productController.deleteProduto
);

export default router;