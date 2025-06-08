import {
    obterListaProdutos,
    buscarProdutoPorId,
    criarNovoProduto,
    atualizarProduto,
    deletarProduto
} from './productService.js';

export const getTodosProdutos = async (req, res, next) => {
    try {
        const produtos = await obterListaProdutos();
        res.status(200).json(produtos);
    } catch (err) {
        next(err);
    }
};

export const getProdutoPorId = async (req, res, next) => {
    try {
        const produto = await buscarProdutoPorId(req.params.id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado.' });
        res.status(200).json(produto);
    } catch (err) {
        next(err);
    }
};

export const postNovoProduto = async (req, res, next) => {
    try {
        const novoProduto = await criarNovoProduto(req.body);
        res.status(201).json(novoProduto);
    } catch (err) {
        next(err);
    }
};

export const putProduto = async (req, res, next) => {
    try {
        const produtoAtualizado = await atualizarProduto(req.params.id, req.body);
        if (!produtoAtualizado) return res.status(404).json({ erro: 'Produto não encontrado.' });
        res.status(200).json(produtoAtualizado);
    } catch (err) {
        next(err);
    }
};

export const deleteProduto = async (req, res, next) => {
    try {
        const removido = await deletarProduto(req.params.id);
        if (!removido) return res.status(404).json({ erro: 'Produto não encontrado.' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};