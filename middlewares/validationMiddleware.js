import { validationResult } from 'express-validator';

export function validarErros(req, res, next) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        // Retorna um erro 400 com a lista de erros de validação.
        return res.status(400).json({
            status: 'falha',
            mensagem: 'Erros de validação nos dados enviados.',
            erros: erros.array(),
        });
    }
    next();
}