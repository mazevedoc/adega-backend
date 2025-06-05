import express from 'express';
import { listarUsuarios } from './userController.js';
import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';
import { validarCadastroUsuario } from './userValidator.js';
import { validarErros } from '../../middlewares/validarErros.js';

router.post(
    '/',
    autenticarToken,
    autorizarPorPapel('admin'),
    validarCadastroUsuario,
    validarErros, // middleware para formatar erros
    cadastrarUsuario // função no controller
);

const router = express.Router();

// Somente admin e gerente podem listar usuários
router.get('/', autenticarToken, autorizarPorPapel('admin', 'gerente'), listarUsuarios);

export default router;
