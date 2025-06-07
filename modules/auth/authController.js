import * as authService from './authService.js';

export async function registrar(req, res, next) {
    try {
        // A chamada ao serviço para cadastrar o usuário continua a mesma.
        const novoUsuario = await authService.cadastrar(req.body);

        // CORREÇÃO:
        // O 'novoUsuario' que vem do seu model já é um objeto simples e seguro.
        // A cláusula RETURNING no seu SQL já omite a senha, o que é excelente.
        // Portanto, podemos enviá-lo diretamente na resposta.
        res.status(201).json({
            status: 'sucesso',
            mensagem: 'Cadastro realizado com sucesso!',
            usuario: novoUsuario // Enviando o objeto diretamente
        });

    } catch (erro) {
        // Qualquer erro do serviço será passado para o nosso manipulador global.
        next(erro);
    }
}

// A função login não precisa de alterações.
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