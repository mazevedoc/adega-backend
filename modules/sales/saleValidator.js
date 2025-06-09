import { body } from 'express-validator';

export const regrasDeVenda = [
    body('cliente_id')
        .isInt({ gt: 0 }).withMessage('O ID do cliente é obrigatório e deve ser um número inteiro.'),

    body('itens')
        .isArray({ min: 1 }).withMessage('A venda deve ter pelo menos um item.'),

    // Validação para cada objeto dentro do array 'itens'
    body('itens.*.produto_id')
        .isInt({ gt: 0 }).withMessage('O ID do produto em cada item é obrigatório.'),

    body('itens.*.quantidade')
        .isInt({ gt: 0 }).withMessage('A quantidade de cada item deve ser um número inteiro maior que zero.'),

    // Outros campos como metodo_pagamento podem ser adicionados aqui
    body('metodo_pagamento')
        .notEmpty().withMessage('O método de pagamento é obrigatório.')
];