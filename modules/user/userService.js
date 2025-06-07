import * as userModel from '../../models/userModel.js';

export async function buscarTodosUsuarios() {
  return await userModel.buscarTodos();
}

export async function buscarUsuarioPorId(id) {
  return await userModel.buscarPorId(id);
}

export async function atualizarUsuario(id, dados) {
  return await userModel.atualizar(id, dados);
}