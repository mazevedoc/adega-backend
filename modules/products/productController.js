import {
    obterListaProdutos,
    buscarProdutoPorId,
    criarNovoProduto,
    atualizarProduto,
    deletarProduto,
    buscarProdutosComFiltros
} from './productService.js';

import { catchAsync } from '../../utils/catchAsync.js';
import ErroAplicacao from '../../utils/appError.js';

// GET /api/produtos - com ou sem filtros
export const getTodosProdutos = catchAsync(async (req, res) => {
    const { nome, categoria_id, fornecedor_id } = req.query;

    const filtros = {
        nome: nome || null,
        categoria_id: categoria_id ? Number(categoria_id) : null,
        fornecedor_id: fornecedor_id ? Number(fornecedor_id) : null
    };

    const temFiltro = filtros.nome || filtros.categoria_id || filtros.fornecedor_id;

    const produtos = temFiltro
        ? await buscarProdutosComFiltros(filtros)
        : await obterListaProdutos();

    res.status(200).json({
        status: 'sucesso',
        resultados: produtos.length,
        dados: produtos
    });
});

// GET /api/produtos/:id
export const getProdutoPorId = catchAsync(async (req, res) => {
    const produto = await buscarProdutoPorId(req.params.id);
    if (!produto) throw new ErroAplicacao('Produto não encontrado.', 404);

    res.status(200).json({
        status: 'sucesso',
        dados: produto
    });
});

// POST /api/produtos
export const postNovoProduto = catchAsync(async (req, res) => {
    const novoProduto = await criarNovoProduto(req.body);

    res.status(201).json({
        status: 'sucesso',
        dados: novoProduto
    });
});

// PUT /api/produtos/:id
export const putProduto = catchAsync(async (req, res) => {
    const produtoAtualizado = await atualizarProduto(req.params.id, req.body);
    if (!produtoAtualizado) throw new ErroAplicacao('Produto não encontrado.', 404);

    res.status(200).json({
        status: 'sucesso',
        dados: produtoAtualizado
    });
});

// DELETE /api/produtos/:id
export const deleteProduto = catchAsync(async (req, res) => {
    const produtoDeletado = await deletarProduto(req.params.id);
    if (!produtoDeletado) throw new ErroAplicacao('Produto não encontrado.', 404);

    res.status(200).json({
        status: 'sucesso',
        mensagem: 'Produto deletado com sucesso.',
        dados: produtoDeletado
    });
});