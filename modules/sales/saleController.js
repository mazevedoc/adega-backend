import * as saleService from './saleService.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const registrarNovaVenda = catchAsync(async (req, res, next) => {

    const usuarioLogado = req.user;

    const novaVenda = await saleService.registrarVenda(req.body, usuarioLogado);

    res.status(201).json({
        status: 'sucesso',
        mensagem: 'Venda registrada com sucesso!',
        venda: novaVenda
    });
});