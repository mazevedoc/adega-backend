import jwt from 'jsonwebtoken';
import ErroAplicacao from '../utils/appError.js';
import { promisify } from 'util';
import { catchAsync } from '../utils/catchAsync.js';

const verificarToken = promisify(jwt.verify);

export const autenticarToken = catchAsync(async (req, res, next) => {
    const cabecalhoAuth = req.headers['authorization'];
    const token = cabecalhoAuth?.split(' ')?.[1];

    if (!token) {
        return next(new ErroAplicacao('Token de autenticação não fornecido.', 401));
    }

    const decodificado = await verificarToken(token, process.env.JWT_SECRET);
    req.user = decodificado;
    next();
});

export function autorizarPorPapel(...papeisPermitidos) {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErroAplicacao('Usuário não autenticado para verificação de papel.', 401));
        }
        const { papel } = req.user;
        if (papeisPermitidos.includes(papel)) {
            next();
        } else {
            next(new ErroAplicacao('Você não tem permissão para acessar este recurso.', 403));
        }
    };
}