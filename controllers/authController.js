const { validarCadastro } = require('../validators/authValidator');
const authService = require('../services/authService');

async function registrarUsuario(req, res) {
    const { nome, email, cpf, senha, papel } = req.body;

    const erroValidacao = validarCadastro({ nome, email, cpf, senha, papel });
    if (erroValidacao) {
        return res.status(400).json({ erro: erroValidacao });
    }

    try {
        const existe = await authService.verificarUsuarioExistente(email, cpf);
        if (existe) {
            return res.status(409).json({ erro: "Usuário já cadastrado." });
        }

        const novoUsuario = await authService.cadastrarUsuario({ nome, email, cpf, senha, papel });
        res.status(201).json({ mensagem: "Cadastro realizado com sucesso", usuario: novoUsuario.nome });
    } catch (err) {
        console.error("Erro no cadastro:", err);
        res.status(500).json({ erro: "Erro interno no servidor." });
    }
}

async function login(req, res, next) {
    try {
        const token = await authService.loginUsuario(req.body);
        res.status(200).json({ token });
    } catch (erro) {
        next(erro);
    }
}

module.exports = { registrarUsuario, login };