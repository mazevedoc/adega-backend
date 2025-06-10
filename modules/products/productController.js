import * as productService from './productService.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ErroAplicacao from '../../utils/appError.js';

export const getProdutos = catchAsync(async (req, res, next) => {
    const produtos = await productService.listarProdutos(req.query);

    res.status(200).json({
        status: 'sucesso',
        resultados: produtos.length,
        dados: { produtos }
    });
});

export const getProdutoPorId = catchAsync(async (req, res, next) => {
    const produto = await productService.buscarProdutoPorId(req.params.id);
    if (!produto) {
        throw new ErroAplicacao('Produto não encontrado com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', dados: { produto } });
});

export const postNovoProduto = catchAsync(async (req, res, next) => {
    const novoProduto = await productService.criarNovoProduto(req.body);
    res.status(201).json({ status: 'sucesso', dados: { produto: novoProduto } });
});

export const putProduto = catchAsync(async (req, res, next) => {
    const produtoAtualizado = await productService.atualizarProduto(req.params.id, req.body);
    if (!produtoAtualizado) {
        throw new ErroAplicacao('Produto não encontrado com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', dados: { produto: produtoAtualizado } });
});

export const deleteProduto = catchAsync(async (req, res, next) => {
    const produtoDeletado = await productService.deletarProduto(req.params.id);
    if (!produtoDeletado) {
        throw new ErroAplicacao('Produto não encontrado com este ID.', 404);
    }
    res.status(200).json({
        status: 'sucesso',
        mensagem: 'Produto deletado com sucesso.',
        dados: { produto: produtoDeletado }
    });
});