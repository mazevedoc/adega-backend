const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // importante para o Neon!
    }
});

pool.connect()
    .then(() => console.log('🟢 Conectado ao PostgreSQL com sucesso!'))
    .catch((err) => console.error('🔴 Erro ao conectar ao PostgreSQL:', err));

module.exports = pool;