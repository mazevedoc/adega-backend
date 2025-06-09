import * as saleService from './saleService.js';

export async function registrarNovaVenda(req, res, next) {
    try {
        // req.user é populado pelo middleware 'autenticarToken'
        const usuarioLogado = req.user;

        // Passamos o corpo da requisição e os dados do usuário logado para o serviço
        const novaVenda = await saleService.registrarVenda(req.body, usuarioLogado);

        res.status(201).json({
            status: 'sucesso',
            mensagem: 'Venda registrada com sucesso!',
            venda: novaVenda
        });

    } catch (erro) {
        next(erro);
    }
}