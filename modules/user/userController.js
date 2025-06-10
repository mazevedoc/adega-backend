import * as usuarioService from './userService.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ErroAplicacao from '../../utils/appError.js';

export const listarUsuarios = catchAsync(async (req, res, next) => {
  const usuarios = await usuarioService.buscarTodosUsuarios();
  res.status(200).json({ status: 'sucesso', dados: { usuarios } });
});

export const buscarUsuarioPorId = catchAsync(async (req, res, next) => {
  const usuario = await usuarioService.buscarUsuarioPorId(req.params.id);
  if (!usuario) {
    throw new ErroAplicacao('Usuário não encontrado com este ID.', 404);
  }
  res.status(200).json({ status: 'sucesso', dados: { usuario } });
});

export const atualizarUsuario = catchAsync(async (req, res, next) => {
  const usuarioAtualizado = await usuarioService.atualizarUsuario(req.params.id, req.body);
  if (!usuarioAtualizado) {
    throw new ErroAplicacao('Usuário não encontrado com este ID.', 404);
  }
  res.status(200).json({ status: 'sucesso', dados: { usuario: usuarioAtualizado } });
});