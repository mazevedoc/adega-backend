import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as UsuarioDAO from '../../models/userModel.js';
import ErroAplicacao from '../../utils/appError.js';

/**
 * Orquestra o cadastro completo de um novo usuário.
 * @param {object} dadosDoUsuario - Contém nome, email, cpf, senha, papel.
 */
export async function cadastrar(dadosDoUsuario) {
    const { email, cpf, senha } = dadosDoUsuario;

    const usuarioExistente = await UsuarioDAO.buscarPorEmailOuCpf(email, cpf);
    if (usuarioExistente) {

        throw new ErroAplicacao('O e-mail ou CPF informado já está cadastrado.', 409);
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await UsuarioDAO.criar({
        ...dadosDoUsuario,
        senha: senhaCriptografada
    });

    return novoUsuario;
}

/**
 * Autentica um usuário e retorna um token JWT.
 * @param {object} credenciais - Contém email e senha.
 */
export async function login(credenciais) {
    const { email, senha } = credenciais;

    const usuario = await UsuarioDAO.buscarPorEmail(email);

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        throw new ErroAplicacao('E-mail ou senha inválidos.', 401);
    }

    const token = jwt.sign(
        { id: usuario.usuario_id, papel: usuario.papel },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return token;
}