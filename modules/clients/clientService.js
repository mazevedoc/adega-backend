import * as clientModel from '../../models/clientModel.js';
import * as saleModel from '../../models/saleModel.js'; // Para verificar o histórico de vendas
import ErroAplicacao from '../../utils/appError.js';

export async function criarCliente(dados) {
    const { cpf, email } = dados;
    const clienteExistente = await clientModel.getPorCpfOuEmail(cpf, email);
    if (clienteExistente) {
        throw new ErroAplicacao('Já existe um cliente com este CPF ou e-mail.', 409);
    }
    return await clientModel.criar(dados);
}

export async function listarClientes() {
    return await clientModel.getTodos();
}

export async function getClientePorId(id) {
    return await clientModel.getPorId(id);
}

export async function atualizarCliente(id, dados) {
    const clienteParaAtualizar = await clientModel.getPorId(id);
    if (!clienteParaAtualizar) return null;

    const { cpf, email } = dados;
    if (cpf || email) {
        const conflito = await clientModel.getPorCpfOuEmail(cpf, email);
        if (conflito && conflito.cliente_id.toString() !== id) {
            throw new ErroAplicacao('Já existe outro cliente com este CPF ou e-mail.', 409);
        }
    }

    return await clientModel.atualizar(id, dados);
}

export async function deletarCliente(id) {
    const vendasDoCliente = await saleModel.getVendasPorClienteId(id);
    if (vendasDoCliente && vendasDoCliente.length > 0) {
        throw new ErroAplicacao('Não é possível excluir este cliente, pois ele possui um histórico de vendas.', 400);
    }
    return await clientModel.deletar(id);
}