// modules/products/productRepository.js
import {
    buscarTodosProdutos,
    buscarProdutoPorId,
    inserirProduto,
    atualizarProdutoPorId,
    deletarProdutoPorId
} from '../../models/productModel.js';

import { ProductEntity } from './productEntity.js';

export const listarProdutos = async () => {
    const rows = await buscarTodosProdutos();
    return rows.map(row => new ProductEntity(row));
};

export const obterProdutoPorId = async (id) => {
    const row = await buscarProdutoPorId(id);
    return row ? new ProductEntity(row) : null;
};

export const salvarProduto = async (produto) => {
    const row = await inserirProduto(produto);
    return new ProductEntity(row);
};

export const editarProduto = async (id, produto) => {
    const row = await atualizarProdutoPorId(id, produto);
    return row ? new ProductEntity(row) : null;
};

export const removerProduto = async (id) => {
    return await deletarProdutoPorId(id);
};