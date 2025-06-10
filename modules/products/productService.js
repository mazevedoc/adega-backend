import * as productModel from '../../models/productModel.js';
import * as categoryModel from '../../models/categoryModel.js';
import * as supplierModel from '../../models/supplierModel.js';
import { ProductEntity } from './productEntity.js';
import ErroAplicacao from '../../utils/appError.js';

/**
 * Busca a lista de produtos, aplicando filtros se existirem.
 * Esta função unifica a listagem geral e a busca filtrada.
 */
export const listarProdutos = async (filtros) => {
    const produtosBrutos = await productModel.buscarProdutosComFiltros(filtros);
    return produtosBrutos.map(p => new ProductEntity(p));
};

/**
 * Busca um produto específico pelo seu ID.
 */
export const buscarProdutoPorId = async (id) => {
    const produtoBruto = await productModel.buscarProdutoPorId(id);
    return produtoBruto ? new ProductEntity(produtoBruto) : null;
};

/**
 * Valida e cria um novo produto.
 */
export const criarNovoProduto = async (dadosDoProduto) => {
    const { sku, categoria_id, fornecedor_id } = dadosDoProduto;

    const [categoriaExiste, fornecedorExiste] = await Promise.all([
        categoryModel.buscarPorId(categoria_id),
        supplierModel.buscarPorId(fornecedor_id)
    ]);

    if (!categoriaExiste) {
        throw new ErroAplicacao('A categoria especificada não existe.', 400);
    }
    if (!fornecedorExiste) {
        throw new ErroAplicacao('O fornecedor especificado não existe.', 400);
    }

    if (sku) {
        const produtoExistente = await productModel.buscarPorSku(sku);
        if (produtoExistente) {
            throw new ErroAplicacao('Já existe um produto cadastrado com este SKU.', 409);
        }
    }

    const novoProdutoBruto = await productModel.inserirProduto(dadosDoProduto);
    return new ProductEntity(novoProdutoBruto);
};

/**
 * Valida e atualiza um produto existente.
 */
export const atualizarProduto = async (id, dadosDoProduto) => {
    const produtoAtual = await productModel.buscarProdutoPorId(id);
    if (!produtoAtual) {
        return null;
    }

    const { sku, categoria_id, fornecedor_id } = dadosDoProduto;

    if (sku && sku !== produtoAtual.sku) {
        const produtoComMesmoSku = await productModel.buscarPorSku(sku);
        if (produtoComMesmoSku && produtoComMesmoSku.produto_id.toString() !== id) {
            throw new ErroAplicacao('Já existe outro produto com este SKU.', 409);
        }
    }

    if (categoria_id) {
        const categoriaExiste = await categoryModel.buscarPorId(categoria_id);
        if (!categoriaExiste) {
            throw new ErroAplicacao('A categoria especificada não existe.', 400);
        }
    }

    if (fornecedor_id) {
        const fornecedorExiste = await supplierModel.buscarPorId(fornecedor_id);
        if (!fornecedorExiste) {
            throw new ErroAplicacao('O fornecedor especificado não existe.', 400);
        }
    }

    const produtoAtualizadoBruto = await productModel.atualizarProdutoPorId(id, dadosDoProduto);
    return new ProductEntity(produtoAtualizadoBruto);
};

/**
 * Valida e deleta um produto.
 */
export const deletarProduto = async (id) => {
    const produto = await productModel.buscarProdutoPorId(id);
    if (!produto) {
        return null;
    }

    const estoque = await productModel.buscarEstoquePorProdutoId(id);
    if (estoque && estoque.quantidade > 0) {
        throw new ErroAplicacao('Não é possível excluir um produto com estoque disponível.', 400);
    }

    return await productModel.deletarProdutoPorId(id);
};