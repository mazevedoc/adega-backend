import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// MUDANÇA: Usando o alias 'UsuarioModel' para ficar mais claro.
import * as UsuarioModel from '../../models/userModel.js';
import ErroAplicacao from '../../utils/appError.js';

export async function cadastrar(dadosDoUsuario) {
    const { email, cpf, senha } = dadosDoUsuario;

    // Agora esta chamada vai funcionar, pois a função existe no userModel.js
    const usuarioExistente = await UsuarioModel.buscarPorEmailOuCpf(email, cpf);
    if (usuarioExistente) {
        throw new ErroAplicacao('O e-mail ou CPF informado já está cadastrado.', 409);
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Chama a função 'criar' que já existe no seu model.
    const novoUsuario = await UsuarioModel.criar({
        ...dadosDoUsuario,
        senha: senhaCriptografada
    });

    return novoUsuario;
}

export async function login(credenciais) {
    const { email, senha } = credenciais;

    // Chama a função 'buscarPorEmail' que já existe no seu model.
    const usuario = await UsuarioModel.buscarPorEmail(email);

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

export async function buscarUsuarioPorId(id) {
    const usuario = await UsuarioModel.buscarUsuarioPorId(id);
    return usuario;
}

export async function buscarTodosUsuarios() {
    const usuarios = await UsuarioModel.buscarTodosUsuarios();
    return usuarios;
}
