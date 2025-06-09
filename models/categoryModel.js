import db from '../config/database.js';

/**
 * Busca uma categoria específica pelo seu ID.
 */
export async function buscarPorId(id) {
    const query = 'SELECT * FROM categorias WHERE categoria_id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

// (No futuro, você pode adicionar aqui as funções criar, atualizar, deletar para categorias)