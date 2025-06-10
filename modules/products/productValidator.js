import { body, param } from 'express-validator';

export const validarProduto = [
    body('nome')
        .notEmpty().withMessage('O nome do produto é obrigatório.')
        .isString().withMessage('O nome deve ser um texto.')
        .isLength({ max: 100 }).withMessage('O nome deve ter no máximo 100 caracteres.'),

    body('preco')
        .notEmpty().withMessage('O preço é obrigatório.')
        .isFloat({ gt: 0 }).withMessage('O preço deve ser um número positivo.'),

    body('categoria_id')
        .notEmpty().withMessage('O ID da categoria é obrigatório.')
        .isInt({ gt: 0 }).withMessage('O ID da categoria deve ser um número inteiro positivo.'),

    body('fornecedor_id')
        .notEmpty().withMessage('O ID do fornecedor é obrigatório.')
        .isInt({ gt: 0 }).withMessage('O ID do fornecedor deve ser um número inteiro positivo.'),

    body('sku')
        .optional().isString().withMessage('SKU deve ser um texto.'),

    body('ativo')
        .optional().isBoolean().withMessage('O campo "ativo" deve ser true ou false.')
];

// Validação para rotas que usam /:id no parâmetro
export const validarId = [
    param('id')
        .isInt({ gt: 0 }).withMessage('O ID do produto deve ser um número inteiro positivo.')
];