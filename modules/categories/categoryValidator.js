import { body, param } from 'express-validator';

export const validarId = [
    param('id').isInt({ gt: 0 }).withMessage('O ID da categoria deve ser um número inteiro positivo.')
];

export const validarCategoria = [
    body('nome')
        .notEmpty().withMessage('O nome da categoria é obrigatório.')
        .isString().withMessage('O nome deve ser um texto.')
        .isLength({ min: 3, max: 50 }).withMessage('O nome deve ter entre 3 e 50 caracteres.'),

    body('descricao')
        .optional().isString().withMessage('A descrição deve ser um texto.'),

    body('url_imagem')
        .optional().isURL().withMessage('A URL da imagem deve ser um link válido.')
];