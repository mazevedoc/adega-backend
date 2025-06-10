import express from 'express';
import * as clientController from './clientController.js';
import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';
import { validarErros } from '../../middlewares/validationMiddleware.js';
import { validarCliente, validarId } from './clientValidator.js';

const router = express.Router();

const papeisAutorizados = ['admin', 'gerente', 'funcionario'];

router.use(autenticarToken, autorizarPorPapel(...papeisAutorizados));

router.route('/')
    .get(clientController.listarClientes)
    .post(validarCliente, validarErros, clientController.criarCliente);

router.route('/:id')
    .get(validarId, validarErros, clientController.getClientePorId)
    .put(validarId, validarCliente, validarErros, clientController.atualizarCliente)
    .delete(validarId, validarErros, clientController.deletarCliente);

export default router;