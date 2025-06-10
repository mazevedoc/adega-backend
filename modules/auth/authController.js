import * as authService from './authService.js';
import { catchAsync } from '../../utils/catchAsync.js';

/**
 * Controller para registrar um novo usuário.
 * O 'catchAsync' cuida do bloco try/catch e do next(erro).
 */
export const registrar = catchAsync(async (req, res, next) => {
    const novoUsuario = await authService.cadastrar(req.body);

    res.status(201).json({
        status: 'sucesso',
        mensagem: 'Cadastro realizado com sucesso!',
        usuario: novoUsuario
    });
});

/**
 * Controller para login de usuário.
 * O 'catchAsync' também é aplicado aqui.
 */
export const login = catchAsync(async (req, res, next) => {
    const token = await authService.login(req.body);

    res.status(200).json({
        status: 'sucesso',
        token
    });
});