import { body, param } from 'express-validator';

export const validarId = [
    param('id').isInt({ gt: 0 }).withMessage('O ID do cliente deve ser um número inteiro positivo.')
];

export const validarCliente = [
    body('nome')
        .notEmpty().withMessage('O nome do cliente é obrigatório.')
        .isString().withMessage('O nome deve ser um texto.'),

    body('email')
        .notEmpty().withMessage('O e-mail é obrigatório.')
        .isEmail().withMessage('O formato do e-mail é inválido.'),

    body('cpf')
        .notEmpty().withMessage('O CPF é obrigatório.')
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).withMessage('Formato de CPF inválido. Use XXX.XXX.XXX-XX.'),

    body('dtnascimento')
        .optional().isISO8601().toDate().withMessage('A data de nascimento deve estar no formato AAAA-MM-DD.'),

    body('preferencias')
        .optional().isObject().withMessage('As preferências devem ser um objeto JSON.')
];