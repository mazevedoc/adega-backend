import * as categoryService from './categoryService.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ErroAplicacao from '../../utils/appError.js';

export const criarCategoria = catchAsync(async (req, res, next) => {
    const novaCategoria = await categoryService.criarCategoria(req.body);
    res.status(201).json({ status: 'sucesso', dados: { categoria: novaCategoria } });
});

export const listarCategorias = catchAsync(async (req, res, next) => {
    const categorias = await categoryService.listarCategorias();
    res.status(200).json({ status: 'sucesso', resultados: categorias.length, dados: { categorias } });
});

export const buscarCategoriaPorId = catchAsync(async (req, res, next) => {
    const categoria = await categoryService.buscarCategoriaPorId(req.params.id);
    if (!categoria) {
        throw new ErroAplicacao('Categoria não encontrada com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', dados: { categoria } });
});

export const atualizarCategoria = catchAsync(async (req, res, next) => {
    const categoriaAtualizada = await categoryService.atualizarCategoria(req.params.id, req.body);
    if (!categoriaAtualizada) {
        throw new ErroAplicacao('Categoria não encontrada com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', dados: { categoria: categoriaAtualizada } });
});

export const deletarCategoria = catchAsync(async (req, res, next) => {
    const categoriaDeletada = await categoryService.deletarCategoria(req.params.id);
    if (!categoriaDeletada) {
        throw new ErroAplicacao('Categoria não encontrada com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', mensagem: 'Categoria deletada com sucesso.' });
});