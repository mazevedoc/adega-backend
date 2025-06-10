import db from '../config/database.js';

export async function criar({ nome, email, telefone, endereco, cpf, dtnascimento, preferencias }) {
    const query = `
        INSERT INTO clientes (nome, email, telefone, endereco, cpf, dtnascimento, preferencias)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const valores = [nome, email, telefone, endereco, cpf, dtnascimento, preferencias];
    const { rows } = await db.query(query, valores);
    return rows[0];
}

export async function getTodos() {
    const { rows } = await db.query('SELECT * FROM clientes ORDER BY nome ASC;');
    return rows;
}

export async function getPorId(id) {
    const { rows } = await db.query('SELECT * FROM clientes WHERE cliente_id = $1;', [id]);
    return rows[0] || null;
}

export async function getPorCpfOuEmail(cpf, email) {
    const query = 'SELECT cliente_id FROM clientes WHERE cpf = $1 OR email = $2;';
    const { rows } = await db.query(query, [cpf, email]);
    return rows[0] || null;
}

export async function atualizar(id, { nome, email, telefone, endereco, cpf, dtnascimento, preferencias }) {
    const query = `
        UPDATE clientes
        SET nome = $1, email = $2, telefone = $3, endereco = $4, cpf = $5, dtnascimento = $6, preferencias = $7, dtultalteracao = CURRENT_TIMESTAMP
        WHERE cliente_id = $8
        RETURNING *;
    `;
    const valores = [nome, email, telefone, endereco, cpf, dtnascimento, preferencias, id];
    const { rows } = await db.query(query, valores);
    return rows[0];
}

export async function deletar(id) {
    const { rows } = await db.query('DELETE FROM clientes WHERE cliente_id = $1 RETURNING *;', [id]);
    return rows[0] || null;
}