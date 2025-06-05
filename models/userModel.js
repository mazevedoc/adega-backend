const db = require('../config/database');

exports.buscarPorEmail = async (email) => {
    const resultado = await db.query('SELECT * FROM usuarios WHERE LOWER(email) = LOWER($1)', [email]);
    return resultado.rows[0];
};

exports.criar = async ({ nome, email, cpf, senha, papel }) => {
    const resultado = await db.query(
        `INSERT INTO usuarios (nome, email, cpf, senha, papel)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING usuario_id, nome, email, papel`,
        [nome, email.toLowerCase(), cpf, senha, papel]
    );
    return resultado.rows[0];
};