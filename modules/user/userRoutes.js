import express from 'express';
import {
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario
} from './userController.js';

import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';
import { validarAtualizacaoUsuario } from './userValidator.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Middleware para capturar erros do express-validator
function tratarErrosValidacao(req, res, next) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }
  next();
}

// GET /usuarios - Listar todos
router.get(
  '/',
  autenticarToken,
  autorizarPorPapel('admin', 'gerente'),
  listarUsuarios
);

// GET /usuarios/:id - Buscar por ID
router.get(
  '/:id',
  autenticarToken,
  autorizarPorPapel('admin', 'gerente'),
  buscarUsuarioPorId
);

// PUT /usuarios/:id - Atualizar
router.put(
  '/:id',
  autenticarToken,
  autorizarPorPapel('admin', 'gerente'),
  validarAtualizacaoUsuario,
  tratarErrosValidacao,
  atualizarUsuario
);

export default router;