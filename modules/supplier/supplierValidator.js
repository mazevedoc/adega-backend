import { body, param } from 'express-validator';

export const validarId = [
    param('id').isInt({ gt: 0 }).withMessage('O ID do fornecedor deve ser um número inteiro positivo.')
];

export const validarFornecedor = [
    body('nome')
        .notEmpty().withMessage('O nome do fornecedor é obrigatório.')
        .isString().withMessage('O nome deve ser um texto.')
        .isLength({ min: 3, max: 100 }).withMessage('O nome deve ter entre 3 e 100 caracteres.'),

    body('responsavel_contato')
        .optional().isString().withMessage('O nome do responsável deve ser um texto.'),

    body('email')
        .optional({ checkFalsy: true })
        .isEmail().withMessage('Forneça um e-mail válido.'),

    body('telefone')
        .optional().isString().withMessage('O telefone deve ser um texto.')
        .isLength({ min: 10 }).withMessage('O telefone deve ter no mínimo 10 caracteres.'),

    body('endereco')
        .optional().isString().withMessage('O endereço deve ser um texto.')
];