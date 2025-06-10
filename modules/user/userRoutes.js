import express from 'express';
import { listarUsuarios, buscarUsuarioPorId, atualizarUsuario } from './userController.js';
import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';
import { validarErros } from '../../middlewares/validationMiddleware.js';
import { validarAtualizacaoUsuario } from './userValidator.js';

const router = express.Router();

router.get('/',
  autenticarToken,
  autorizarPorPapel('admin', 'gerente'),
  listarUsuarios
);

router.get('/:id',
  autenticarToken,
  autorizarPorPapel('admin', 'gerente'),
  validarErros,
  buscarUsuarioPorId
);

router.put('/:id',
  autenticarToken,
  autorizarPorPapel('admin'),
  validarAtualizacaoUsuario,
  validarErros,
  atualizarUsuario
);

export default router;