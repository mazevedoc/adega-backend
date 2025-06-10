import db from '../config/database.js';

export async function criar({ nome, responsavel_contato, email, telefone, endereco }) {
    const query = `
        INSERT INTO fornecedores (nome, responsavel_contato, email, telefone, endereco) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const { rows } = await db.query(query, [nome, responsavel_contato, email, telefone, endereco]);
    return rows[0];
}

export async function getTodas() {
    const { rows } = await db.query('SELECT * FROM fornecedores ORDER BY nome ASC;');
    return rows;
}

export async function getPorId(id) {
    const { rows } = await db.query('SELECT * FROM fornecedores WHERE fornecedor_id = $1;', [id]);
    return rows[0] || null;
}

export async function getPorNome(nome) {
    const { rows } = await db.query('SELECT * FROM fornecedores WHERE nome ILIKE $1;', [nome]);
    return rows[0] || null;
}

export async function atualizar(id, { nome, responsavel_contato, email, telefone, endereco }) {
    const query = `
        UPDATE fornecedores 
        SET nome = $1, 
            responsavel_contato = $2, 
            email = $3,
            telefone = $4,
            endereco = $5
        WHERE fornecedor_id = $6
        RETURNING *;
    `;
    const { rows } = await db.query(query, [nome, responsavel_contato, email, telefone, endereco, id]);
    return rows[0];
}

export async function deletar(id) {
    const { rows } = await db.query('DELETE FROM fornecedores WHERE fornecedor_id = $1 RETURNING *;', [id]);
    return rows[0] || null;
}