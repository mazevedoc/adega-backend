import app from './app.js';
import pool from './config/database.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await pool.connect();
        console.log('🟢 Conectado ao PostgreSQL com sucesso!');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.error('🔴 Erro ao conectar ao PostgreSQL:', err);
        process.exit(1); // encerra o processo com erro
    }
}

startServer();
