import express from 'express';
import * as supplierController from './supplierController.js';
import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';
import { validarErros } from '../../middlewares/validationMiddleware.js';
import { validarFornecedor, validarId } from './supplierValidator.js';

const router = express.Router();
const papeisAutorizados = ['admin', 'gerente'];

router.get('/',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    supplierController.listarFornecedores);

router.get('/:id',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    validarId, validarErros,
    supplierController.getFornecedorPorId);

router.post('/',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    validarFornecedor, validarErros,
    supplierController.criarFornecedor);

router.put('/:id',
    autenticarToken,
    autorizarPorPapel(...papeisAutorizados),
    validarId, validarFornecedor, validarErros,
    supplierController.atualizarFornecedor);

router.delete('/:id',
    autenticarToken,
    autorizarPorPapel('admin'),
    validarId, validarErros,
    supplierController.deletarFornecedor);

export default router;