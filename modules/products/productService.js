import * as productModel from '../../models/productModel.js';
import { ProductEntity } from './productEntity.js';
import ErroAplicacao from '../../utils/appError.js';

/**
 * Busca a lista de todos os produtos e a converte em entidades.
 */
export const obterListaProdutos = async () => {
    const produtosBrutos = await productModel.buscarTodosProdutos();
    // A responsabilidade de mapear para a entidade agora é do serviço.
    return produtosBrutos.map(produto => new ProductEntity(produto));
};

/**
 * Busca um produto específico pelo ID.
 */
export const buscarProdutoPorId = async (id) => {
    const produtoBruto = await productModel.buscarProdutoPorId(id);
    // Se não encontrar, retorna nulo (o controller tratará o 404).
    return produtoBruto ? new ProductEntity(produtoBruto) : null;
};

/**
 * Contém a LÓGICA DE NEGÓCIO para criar um novo produto.
 */
export const criarNovoProduto = async (dadosDoProduto) => {
    const { sku } = dadosDoProduto;

    // ===== INÍCIO DA LÓGICA DE NEGÓCIO =====
    // 1. Verificar se o SKU do produto já existe no banco.
    if (sku) {
        const produtoExistente = await productModel.buscarPorSku(sku);
        if (produtoExistente) {
            throw new ErroAplicacao('Já existe um produto cadastrado com este SKU.', 409); // 409 Conflict
        }
    }
    // (Aqui vai entrar outras regras: verificar se categoria_id é válido, etc.)
    // ===== FIM DA LÓGICA DE NEGÓCIO =====

    // Se todas as regras de negócio passarem, cria o produto.
    const novoProdutoBruto = await productModel.inserirProduto(dadosDoProduto);
    return new ProductEntity(novoProdutoBruto);
};

/**
 * Contém a LÓGICA DE NEGÓCIO para atualizar um produto.
 */
export const atualizarProduto = async (id, dadosDoProduto) => {

    //Verificar se o produto que se quer atualizar realmente existe.
    const produtoParaAtualizar = await productModel.buscarProdutoPorId(id);
    if (!produtoParaAtualizar) {
        return null;
    }

    // (Aqui entrar outras regras, como verificar se o novo SKU não conflita com outro produto)

    const produtoAtualizadoBruto = await productModel.atualizarProdutoPorId(id, dadosDoProduto);
    return new ProductEntity(produtoAtualizadoBruto);
};

/**
 * Deleta um produto.
 */
export const deletarProduto = async (id) => {
    // colocar lógicas aqui, como "não deletar se o produto tiver estoque".
    // Por enquanto, apenas repassamos a chamada.
    return await productModel.deletarProdutoPorId(id);
};