import * as usuarioService from './userService.js';

// Lista todos os usuários (admin e gerente)
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioService.buscarTodosUsuarios();
    res.status(200).json(usuarios);
  } catch (erro) {
    console.error('Erro ao listar usuários:', erro);
    res.status(500).json({ erro: 'Erro ao listar usuários.' });
  }
}

// Busca um usuário por ID (admin e gerente)
export async function buscarUsuarioPorId(req, res) {
  const { id } = req.params;

  try {
    const usuario = await usuarioService.buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.status(200).json(usuario);
  } catch (erro) {
    console.error('Erro ao buscar usuário por ID:', erro);
    res.status(500).json({ erro: 'Erro ao buscar usuário.' });
  }
}

// Atualiza dados de um usuário (admin e gerente)
export async function atualizarUsuario(req, res) {
  const { id } = req.params;
  const { nome, cpf, email, papel } = req.body;

  try {
    // Verifica se o usuário existe
    const usuarioExistente = await usuarioService.buscarUsuarioPorId(id);
    if (!usuarioExistente) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const usuarioAtualizado = await usuarioService.atualizarUsuario(id, {
      nome,
      cpf,
      email,
      papel,
    });

    res.status(200).json(usuarioAtualizado);
  } catch (erro) {
    console.error('Erro ao atualizar usuário:', erro);
    res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
  }
}