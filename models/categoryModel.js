import db from '../config/database.js';

export async function criar({ nome, descricao, url_imagem }) {
    const query = `
        INSERT INTO categorias (nome, descricao, url_imagem) 
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const { rows } = await db.query(query, [nome, descricao, url_imagem]);
    return rows[0];
}

export async function buscarTodas() {
    const { rows } = await db.query('SELECT * FROM categorias ORDER BY nome ASC;');
    return rows;
}

export async function buscarPorId(id) {
    const { rows } = await db.query('SELECT * FROM categorias WHERE categoria_id = $1;', [id]);
    return rows[0] || null;
}

export async function buscarPorNome(nome) {
    const { rows } = await db.query('SELECT * FROM categorias WHERE nome ILIKE $1;', [nome]);
    return rows[0] || null;
}

export async function atualizar(id, { nome, descricao, url_imagem }) {
    const query = `
        UPDATE categorias 
        SET nome = $1, descricao = $2, url_imagem = $3
        WHERE categoria_id = $4
        RETURNING *;
    `;
    const { rows } = await db.query(query, [nome, descricao, url_imagem, id]);
    return rows[0];
}

export async function deletar(id) {
    const { rows } = await db.query('DELETE FROM categorias WHERE categoria_id = $1 RETURNING *;', [id]);
    return rows[0] || null;
}