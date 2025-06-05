import * as usuarioService from './userService.js';

export async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuarioService.buscarTodosUsuarios();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar usuários.' });
    }
}
