import { body } from 'express-validator';

export const regrasDeProduto = [
    body('nome')
        .notEmpty().withMessage('O nome do produto é obrigatório.')
        .isString().withMessage('O nome deve ser um texto.'),

    body('preco')
        .notEmpty().withMessage('O preço é obrigatório.')
        .isFloat({ gt: 0 }).withMessage('O preço deve ser um número maior que zero.'),

    body('categoria_id')
        .isInt({ gt: 0 }).withMessage('A categoria é obrigatória.'),

    body('fornecedor_id')
        .isInt({ gt: 0 }).withMessage('O fornecedor é obrigatório.'),

    body('ativo')
        .optional().isBoolean().withMessage('O campo "ativo" deve ser um booleano (true/false).')
];