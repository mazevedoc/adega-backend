import * as categoryModel from '../../models/categoryModel.js';
import * as productModel from '../../models/productModel.js';
import ErroAplicacao from '../../utils/appError.js';

export async function criarCategoria(dados) {
    const categoriaExistente = await categoryModel.buscarPorNome(dados.nome);
    if (categoriaExistente) {
        throw new ErroAplicacao('Já existe uma categoria com este nome.', 409);
    }
    return await categoryModel.criar(dados);
}

export async function listarCategorias() {
    return await categoryModel.buscarTodas();
}

export async function buscarCategoriaPorId(id) {
    return await categoryModel.buscarPorId(id);
}

export async function atualizarCategoria(id, dados) {
    // Verifica se a categoria que queremos atualizar existe
    const categoriaParaAtualizar = await categoryModel.buscarPorId(id);
    if (!categoriaParaAtualizar) {
        return null;
    }

    // Verifica se o novo nome já não está em uso por OUTRA categoria
    const categoriaExistente = await categoryModel.buscarPorNome(dados.nome);
    if (categoriaExistente && categoriaExistente.categoria_id.toString() !== id) {
        throw new ErroAplicacao('Já existe outra categoria com este nome.', 409);
    }

    return await categoryModel.atualizar(id, dados);
}

export async function deletarCategoria(id) {
    // REGRA DE NEGÓCIO: Não permitir deletar uma categoria se ela estiver sendo usada por algum produto.
    const produtosComCategoria = await productModel.buscarProdutosComFiltros({ categoria_id: id });
    if (produtosComCategoria && produtosComCategoria.length > 0) {
        throw new ErroAplicacao('Não é possível excluir esta categoria, pois ela está associada a produtos existentes.', 400);
    }

    return await categoryModel.deletar(id);
}