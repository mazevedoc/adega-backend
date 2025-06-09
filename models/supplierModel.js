import db from '../config/database.js';

/**
 * Busca um fornecedor específico pelo seu ID.
 */
export async function buscarPorId(id) {
    const query = 'SELECT * FROM fornecedores WHERE fornecedor_id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

// (No futuro, você pode adicionar aqui as funções criar, atualizar, deletar para fornecedores)