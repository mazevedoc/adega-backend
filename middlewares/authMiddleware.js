// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import ErroAplicacao from '../utils/appError.js';

export function autenticarToken(req, res, next) {
    const cabecalhoAuth = req.headers['authorization'];
    // O token vem no formato "Bearer TOKEN". Precisamos extrair apenas o TOKEN.
    const token = cabecalhoAuth && cabecalhoAuth.split(' ')[1];

    if (!token) {
        // Se não há token, retorna um erro 401 (Não Autorizado).
        return next(new ErroAplicacao('Token de autenticação não fornecido.', 401));
    }

    jwt.verify(token, process.env.JWT_SECRET, (erro, decodificado) => {
        if (erro) {
            // Se o token for inválido ou expirado, retorna um erro 403 (Proibido).
            return next(new ErroAplicacao('Token inválido ou expirado.', 403));
        }

        // ESTA É A LINHA MAIS IMPORTANTE:
        // Anexa o payload decodificado (que contém id e papel) ao objeto da requisição.
        req.user = decodificado;

        // Continua para a próxima função (o controller ou outro middleware).
        next();
    });
}


export function autorizarPorPapel(...papeisPermitidos) {
    return (req, res, next) => {
        // Este middleware deve rodar DEPOIS do 'autenticarToken',
        // então 'req.user' já deve existir.
        const { papel } = req.user;

        if (papeisPermitidos.includes(papel)) {
            // Se o papel do usuário está na lista de papéis permitidos, continua.
            next();
        } else {
            // Se não, retorna um erro 403 (Proibido).
            next(new ErroAplicacao('Você não tem permissão para acessar este recurso.', 403));
        }
    };
}