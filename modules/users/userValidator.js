import { body } from 'express-validator';

export const validarCadastroUsuario = [
    body('nome')
        .notEmpty().withMessage('O nome é obrigatório.')
        .isLength({ min: 2 }).withMessage('O nome deve ter pelo menos 2 caracteres.'),

    body('cpf')
        .notEmpty().withMessage('O CPF é obrigatório.')
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).withMessage('Formato de CPF inválido. Use XXX.XXX.XXX-XX.'),

    body('email')
        .notEmpty().withMessage('O e-mail é obrigatório.')
        .isEmail().withMessage('E-mail inválido.'),

    body('senha')
        .notEmpty().withMessage('A senha é obrigatória.')
        .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),

    body('papel')
        .notEmpty().withMessage('O papel do usuário é obrigatório.')
        .isIn(['admin', 'gerente', 'funcionario']).withMessage('Papel inválido. Use admin, gerente ou funcionario.')
];

export const validarAtualizacaoUsuario = [
    body('nome')
        .optional()
        .isLength({ min: 2 }).withMessage('O nome deve ter pelo menos 2 caracteres.'),

    body('email')
        .optional()
        .isEmail().withMessage('E-mail inválido.'),

    body('senha')
        .optional()
        .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),

    body('papel')
        .optional()
        .isIn(['admin', 'gerente', 'funcionario']).withMessage('Papel inválido. Use admin, gerente ou funcionario.')
];
