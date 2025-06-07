import {
    buscarResumo,
    buscarVendasPorMes,
    buscarUltimasVendas,
    buscarProdutosResumo
} from './dashboardService.js';

export const obterResumo = async (req, res, next) => {
    try {
        const resumo = await buscarResumo();
        res.json(resumo);
    } catch (error) {
        console.error('Erro ao obter resumo do dashboard:', error);
        next(error);
    }
};

export const obterVendasPorMes = async (req, res, next) => {
    try {
        const vendas = await buscarVendasPorMes();
        res.json(vendas);
    } catch (error) {
        console.error('Erro ao obter vendas por mês:', error);
        next(error);
    }
};

export const obterUltimasVendas = async (req, res, next) => {
    try {
        const vendas = await buscarUltimasVendas();
        res.json(vendas);
    } catch (error) {
        console.error('Erro ao obter últimas vendas:', error);
        next(error);
    }
};

export const obterProdutosResumo = async (req, res, next) => {
    try {
        const produtos = await buscarProdutosResumo();
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao obter produtos do dashboard:', error);
        next(error);
    }
};