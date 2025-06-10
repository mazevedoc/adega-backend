import * as UserModel from '../../models/userModel.js';
import ErroAplicacao from '../../utils/appError.js';

export async function buscarTodosUsuarios() {
    // Por enquanto, apenas repassa a chamada. No futuro, poderia ter lógica de paginação aqui.
    return await UserModel.buscarTodos();
}

export async function buscarUsuarioPorId(id) {
    return await UserModel.buscarPorId(id);
}

export async function atualizarUsuario(id, dadosParaAtualizar) {
    // LÓGICA DE NEGÓCIO: Verificar se o novo email ou CPF já não estão em uso por OUTRO usuário.
    const { email, cpf } = dadosParaAtualizar;

    if (email || cpf) {
        const conflito = await UserModel.buscarPorEmailOuCpf(email, cpf);
        // Se encontrou um usuário e o ID dele é diferente do que estamos atualizando...
        if (conflito && conflito.usuario_id.toString() !== id) {
            throw new ErroAplicacao('O e-mail ou CPF informado já pertence a outro usuário.', 409);
        }
    }

    // Se passou na validação, chama o model para atualizar.
    const usuarioAtualizado = await UserModel.atualizar(id, dadosParaAtualizar);
    return usuarioAtualizado;
}