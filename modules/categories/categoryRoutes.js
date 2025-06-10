import express from 'express';
import * as categoryController from './categoryController.js';
import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';
import { validarErros } from '../../middlewares/validationMiddleware.js';
import { validarCategoria, validarId } from './categoryValidator.js';

const router = express.Router();

const papeisAutorizados = ['admin', 'gerente'];

// Rotas públicas (qualquer um, mesmo deslogado, pode ver as categorias)
router.get(
    '/',
    categoryController.listarCategorias);
router.get(
    '/:id',
    validarId,
    validarErros,
    categoryController.buscarCategoriaPorId);

// Rotas protegidas para gerenciamento
router.post(
    '/',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    validarCategoria, validarErros,
    categoryController.criarCategoria);

router.put(
    '/:id',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    validarId,
    validarCategoria,
    validarErros,
    categoryController.atualizarCategoria);

router.delete(
    '/:id',
    autenticarToken,
    autorizarPorPapel('admin'),
    validarId, validarErros,
    categoryController.deletarCategoria);

export default router;