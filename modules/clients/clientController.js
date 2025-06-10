import * as clientService from './clientService.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ErroAplicacao from '../../utils/appError.js';

export const criarCliente = catchAsync(async (req, res, next) => {
    const novoCliente = await clientService.criarCliente(req.body);
    res.status(201).json({ status: 'sucesso', dados: { cliente: novoCliente } });
});

export const listarClientes = catchAsync(async (req, res, next) => {
    const clientes = await clientService.listarClientes();
    res.status(200).json({ status: 'sucesso', resultados: clientes.length, dados: { clientes } });
});

export const getClientePorId = catchAsync(async (req, res, next) => {
    const cliente = await clientService.getClientePorId(req.params.id);
    if (!cliente) {
        throw new ErroAplicacao('Cliente não encontrado com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', dados: { cliente } });
});

export const atualizarCliente = catchAsync(async (req, res, next) => {
    const clienteAtualizado = await clientService.atualizarCliente(req.params.id, req.body);
    if (!clienteAtualizado) {
        throw new ErroAplicacao('Cliente não encontrado com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', dados: { cliente: clienteAtualizado } });
});

export const deletarCliente = catchAsync(async (req, res, next) => {
    const clienteDeletado = await clientService.deletarCliente(req.params.id);
    if (!clienteDeletado) {
        throw new ErroAplicacao('Cliente não encontrado com este ID.', 404);
    }
    res.status(200).json({ status: 'sucesso', mensagem: 'Cliente deletado com sucesso.' });
});