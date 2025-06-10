// utils/logger.js
import fs from 'fs';
import path from 'path';

// __dirname não existe em ES Modules, então usamos uma alternativa
const __dirname = path.dirname(new URL(import.meta.url).pathname.substring(1));
const logPath = path.join(__dirname, '../../logs', 'errors.log');

// Garante que a pasta 'logs' na raiz do projeto exista
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

export function registrarErro(mensagem) {
    const dataHora = new Date().toISOString();
    const log = `[${dataHora}] ${mensagem}\n\n`; // Adicionado \n extra para separar logs

    try {
        // SUGESTÃO: Usar a versão síncrona para garantir a escrita imediata do log.
        fs.appendFileSync(logPath, log);
    } catch (err) {
        console.error('Falha CRÍTICA ao escrever no arquivo de log:', err);
    }
}