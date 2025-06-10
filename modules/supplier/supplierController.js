import * as supplierService from './supplierService.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ErroAplicacao from '../../utils/appError.js';

export const criarFornecedor = catchAsync(async (req, res, next) => {
    const novoFornecedor = await supplierService.criarFornecedor(req.body);
    res.status(201).json({ status: 'sucesso', dados: { fornecedor: novoFornecedor } });
});

export const listarFornecedores = catchAsync(async (req, res, next) => {
    const fornecedores = await supplierService.listarFornecedores();
    res.status(200).json({ status: 'sucesso', resultados: fornecedores.length, dados: { fornecedores } });
});

export const getFornecedorPorId = catchAsync(async (req, res, next) => {
    const fornecedor = await supplierService.getFornecedorPorId(req.params.id);
    if (!fornecedor) {
        throw new ErroAplicacao('Fornecedor não encontrado com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', dados: { fornecedor } });
});

export const atualizarFornecedor = catchAsync(async (req, res, next) => {
    const fornecedorAtualizado = await supplierService.atualizarFornecedor(req.params.id, req.body);
    if (!fornecedorAtualizado) {
        throw new ErroAplicacao('Fornecedor não encontrado com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', dados: { fornecedor: fornecedorAtualizado } });
});

export const deletarFornecedor = catchAsync(async (req, res, next) => {
    const fornecedorDeletado = await supplierService.deletarFornecedor(req.params.id);
    if (!fornecedorDeletado) {
        throw new ErroAplicacao('Fornecedor não encontrado com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', mensagem: 'Fornecedor deletado com sucesso.' });
});