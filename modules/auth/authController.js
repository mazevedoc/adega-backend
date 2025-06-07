import * as authService from './authService.js';
import ErroAplicacao from '../../utils/appError.js';

export async function registrar(req, res, next) {
    try {
        const novoUsuario = await authService.cadastrar(req.body);

        // Remove a senha da resposta antes de enviar.
        const usuarioParaResposta = { ...novoUsuario.toJSON() };
        delete usuarioParaResposta.senha;

        res.status(201).json({
            status: 'sucesso',
            mensagem: 'Cadastro realizado com sucesso!',
            usuario: usuarioParaResposta
        });

    } catch (erro) {
        next(erro);
    }
}
export async function login(req, res, next) {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({
            status: 'sucesso',
            token
        });
    } catch (erro) {
        next(erro);
    }
}