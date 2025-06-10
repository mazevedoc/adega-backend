import rateLimit from 'express-rate-limit';

/**
 * Limitador de requisições geral para todas as rotas da API.
 * Bloqueia um IP após um certo número de requisições
 */
export const limitadorGeral = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 200, // Limite: 200 requisições por IP
    message: {
        status: 'falha',
        mensagem: 'Muitas requisições feitas a partir deste IP. Por favor, tente novamente após 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const limitadorDeLogin = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutos
    max: 5, // Limite: 5 tentativas de login por IP
    message: {
        status: 'falha',
        mensagem: 'Muitas tentativas de login a partir deste IP. Por favor, tente novamente após 30 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});