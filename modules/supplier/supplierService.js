import * as supplierModel from '../../models/supplierModel.js';
import * as productModel from '../../models/productModel.js';
import ErroAplicacao from '../../utils/appError.js';

export async function criarFornecedor(dados) {
    const fornecedorExistente = await supplierModel.getPorNome(dados.nome);
    if (fornecedorExistente) {
        throw new ErroAplicacao('Já existe um fornecedor com este nome.', 409);
    }
    return await supplierModel.criar(dados);
}

export async function listarFornecedores() {
    return await supplierModel.getTodas();
}

export async function getFornecedorPorId(id) {
    return await supplierModel.getPorId(id);
}

export async function atualizarFornecedor(id, dados) {
    const fornecedorParaAtualizar = await supplierModel.getPorId(id);
    if (!fornecedorParaAtualizar) {
        return null;
    }
    const fornecedorExistente = await supplierModel.getPorNome(dados.nome);
    if (fornecedorExistente && fornecedorExistente.fornecedor_id.toString() !== id) {
        throw new ErroAplicacao('Já existe outro fornecedor com este nome.', 409);
    }
    return await supplierModel.atualizar(id, dados);
}

export async function deletarFornecedor(id) {
    const produtosComFornecedor = await productModel.getProdutosComFiltros({ fornecedor_id: id });
    if (produtosComFornecedor && produtosComFornecedor.length > 0) {
        throw new ErroAplicacao('Não é possível excluir este fornecedor, pois ele está associado a produtos existentes.', 400);
    }
    return await supplierModel.deletar(id);
}