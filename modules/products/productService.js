import * as productModel from '../../models/productModel.js';
import * as categoryModel from '../../models/categoryModel.js';
import * as supplierModel from '../../models/supplierModel.js';
import { ProductEntity } from './productEntity.js';
import ErroAplicacao from '../../utils/appError.js';

export const obterListaProdutos = async () => {
    const produtosBrutos = await productModel.buscarTodosProdutos();
    return produtosBrutos.map(produto => new ProductEntity(produto));
};

export const buscarProdutoPorId = async (id) => {
    const produtoBruto = await productModel.buscarProdutoPorId(id);
    return produtoBruto ? new ProductEntity(produtoBruto) : null;
};

export const buscarProdutosComFiltros = async (filtros) => {
    const produtosBrutos = await productModel.buscarProdutosComFiltros(filtros);
    return produtosBrutos.map(produto => new ProductEntity(produto));
};

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

export const atualizarProduto = async (id, dadosDoProduto) => {
    const produtoAtual = await productModel.buscarProdutoPorId(id);
    if (!produtoAtual) {
        return null;
    }

    const { sku, categoria_id, fornecedor_id } = dadosDoProduto;

    // Validação de SKU: verificar se está sendo alterado e se já existe em outro produto
    if (sku && sku !== produtoAtual.sku) {
        const produtoComMesmoSku = await productModel.buscarPorSku(sku);
        if (produtoComMesmoSku && produtoComMesmoSku.produto_id !== id) {
            throw new ErroAplicacao('Já existe outro produto com este SKU.', 409);
        }
    }

    // Validar categoria (se enviada)
    if (categoria_id) {
        const categoriaExiste = await categoryModel.buscarPorId(categoria_id);
        if (!categoriaExiste) {
            throw new ErroAplicacao('A categoria especificada não existe.', 400);
        }
    }

    // Validar fornecedor (se enviado)
    if (fornecedor_id) {
        const fornecedorExiste = await supplierModel.buscarPorId(fornecedor_id);
        if (!fornecedorExiste) {
            throw new ErroAplicacao('O fornecedor especificado não existe.', 400);
        }
    }

    const produtoAtualizadoBruto = await productModel.atualizarProdutoPorId(id, dadosDoProduto);
    return new ProductEntity(produtoAtualizadoBruto);
};

export const deletarProduto = async (id) => {
    const produto = await productModel.buscarProdutoPorId(id);
    if (!produto) {
        return null;
    }

    // Regra: não permitir deletar produto com estoque > 0
    if (produto.estoque > 0) {
        throw new ErroAplicacao('Não é possível excluir um produto com estoque disponível.', 400);
    }

    return await productModel.deletarProdutoPorId(id);
};