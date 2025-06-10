import { body } from 'express-validator';

// Regras para a rota de registro
export const regrasDeRegistro = [
  body('nome')
    .notEmpty().withMessage('O nome é obrigatório.'),

  body('email')
    .isEmail().withMessage('Forneça um e-mail válido.'),

  body('cpf')
    .notEmpty().withMessage('O CPF é obrigatório.')
    //expressão regular para validar o formato XXX.XXX.XXX-XX
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).withMessage('Formato de CPF inválido. Use XXX.XXX.XXX-XX.'),

  body('senha')
    .isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.'),

  body('papel')
    .isIn(['admin', 'gerente', 'funcionario']).withMessage('O papel do usuário é inválido.')
];

// Regras para a rota de login
export const regrasDeLogin = [
  body('email')
    .isEmail().withMessage('Forneça um e-mail válido.'),

  body('senha')
    .notEmpty().withMessage('A senha é obrigatória.')
];