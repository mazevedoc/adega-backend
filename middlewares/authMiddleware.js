const jwt = require('jsonwebtoken');

export function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token de autenticação não fornecido.' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ erro: 'Token não encontrado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json({ erro: 'Token inválido ou expirado.' });
        }

        req.usuario = usuario; // { usuario_id, papel, iat, exp }
        next();
    });
}

export function autorizarPorPapel(...papeisPermitidos) {
    return (req, res, next) => {
        const { papel } = req.usuario;

        if (!papeisPermitidos.includes(papel)) {
            return res.status(403).json({ erro: 'Acesso negado. Permissão insuficiente.' });
        }

        next();
    };
}