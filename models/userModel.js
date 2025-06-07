import db from '../config/database.js';

// Busca todos os usuários
export async function buscarTodos() {
    const query = `
    SELECT usuario_id, nome, cpf, email, papel, dtcriacao, dtultalteracao
    FROM usuarios
    ORDER BY usuario_id
  `;
    const { rows } = await db.query(query);
    return rows;
}

// Busca usuário por ID
export async function buscarPorId(id) {
    const query = `
    SELECT usuario_id, nome, cpf, email, papel, dtcriacao, dtultalteracao
    FROM usuarios
    WHERE usuario_id = $1
  `;
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

// Atualiza usuário
export async function atualizar(id, { nome, cpf, email, papel }) {
    const query = `
    UPDATE usuarios
    SET nome = $1,
        cpf = $2,
        email = $3,
        papel = $4,
        dtultalteracao = CURRENT_TIMESTAMP
    WHERE usuario_id = $5
    RETURNING usuario_id, nome, cpf, email, papel, dtcriacao, dtultalteracao
  `;

    const valores = [nome, cpf, email, papel, id];
    const { rows } = await db.query(query, valores);
    return rows[0];
}

// Busca usuário pelo email (case-insensitive)
export async function buscarPorEmail(email) {
    const resultado = await db.query(
        'SELECT * FROM usuarios WHERE LOWER(email) = LOWER($1)',
        [email.toLowerCase()]
    );
    return resultado.rows[0];
}

// Cria novo usuário
export async function criar({ nome, email, cpf, senha, papel }) {
    const resultado = await db.query(
        `INSERT INTO usuarios (nome, email, cpf, senha, papel)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING usuario_id, nome, email, papel`,
        [nome, email.toLowerCase(), cpf, senha, papel]
    );
    return resultado.rows[0];
}