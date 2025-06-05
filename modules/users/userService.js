import pool from '../../config/database.js';

export async function buscarTodosUsuarios() {
    const { rows } = await pool.query('SELECT usuario_id, nome, email, papel, dtcriacao FROM usuarios ORDER BY dtcriacao DESC');
    return rows;
}
