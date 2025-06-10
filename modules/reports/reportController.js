import * as reportService from './reportService.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const getResumo = catchAsync(async (req, res, next) => {
    const resumo = await reportService.getResumo();
    res.status(200).json(resumo);
});

export const getVendasPorMes = catchAsync(async (req, res, next) => {
    const vendas = await reportService.getVendasPorMes();
    res.status(200).json(vendas);
});

export const getUltimasVendas = catchAsync(async (req, res, next) => {
    const vendas = await reportService.getUltimasVendas();
    res.status(200).json(vendas);
});

export const getResumoDeProdutos = catchAsync(async (req, res, next) => {
    const produtos = await reportService.getResumoDeProdutos();
    res.status(200).json(produtos);
});

export const getRankingDeProdutos = catchAsync(async (req, res, next) => {
    const filtros = req.query;
    const ranking = await reportService.getRankingDeProdutos(filtros);

    res.status(200).json({
        status: 'sucesso',
        data: ranking,
    });
});

export const getVendasPorPeriodo = catchAsync(async (req, res, next) => {
    const filtros = req.query;
    const relatorio = await reportService.getVendasPorPeriodo(filtros);

    res.status(200).json({
        status: 'sucesso',
        data: relatorio,
    });
});