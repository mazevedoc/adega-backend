import { validationResult } from 'express-validator';

export function validarErros(req, res, next) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }
    next();
}
