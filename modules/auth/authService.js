import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../config/database.js';
import * as Usuario from '../../models/userModel.js';

export async function verificarUsuarioExistente(email, cpf) {
    const resultado = await pool.query(
        'SELECT * FROM usuarios WHERE LOWER(email) = LOWER($1) OR cpf = $2',
        [email.toLowerCase(), cpf]
    );
    return resultado.rows.length > 0;
}

export async function cadastrarUsuario({ nome, email, cpf, senha, papel }) {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    return await Usuario.criar({ nome, email, cpf, senha: senhaCriptografada, papel });
}

export async function loginUsuario({ email, senha }) {
    const usuario = await Usuario.buscarPorEmail(email);
    if (!usuario) throw new Error('Credenciais inválidas.');

    const senhaConfere = await bcrypt.compare(senha, usuario.senha);
    if (!senhaConfere) throw new Error('Credenciais inválidas.');

    const token = jwt.sign(
        { usuario_id: usuario.usuario_id, papel: usuario.papel },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return token;
}