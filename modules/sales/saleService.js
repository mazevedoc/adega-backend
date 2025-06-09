import * as saleModel from '../../models/saleModel.js';
import * as productModel from '../../models/productModel.js';
import ErroAplicacao from '../../utils/appError.js';

/**
 * Orquestra a criação de uma nova venda, aplicando as regras de negócio.
 */
export async function registrarVenda(dadosDoPedido, usuarioLogado) {
    const { cliente_id, itens, ...outrosDados } = dadosDoPedido;
    const { id: usuario_id, papel: usuario_papel } = usuarioLogado; // Extrai dados do token

    if (!itens || itens.length === 0) {
        throw new ErroAplicacao('A venda deve conter pelo menos um item.', 400);
    }

    // Pega todos os IDs de produto do pedido para uma única consulta no banco
    const idsDeProdutos = itens.map(item => item.produto_id);

    // Busca todos os produtos de uma vez para otimizar
    const produtosDoBanco = await productModel.buscarVariosPorId(idsDeProdutos);

    // Verifica se todos os produtos solicitados existem
    if (produtosDoBanco.length !== idsDeProdutos.length) {
        throw new ErroAplicacao('Um ou mais produtos no pedido não foram encontrados.', 404);
    }

    let valorTotalCalculado = 0;
    const itensParaVenda = [];

    for (const itemDoPedido of itens) {
        const produtoCorrespondente = produtosDoBanco.find(p => p.produto_id === itemDoPedido.produto_id);

        // Busca o estoque do produto. (Assumindo que temos uma função no productModel)
        const estoque = await productModel.buscarEstoquePorProdutoId(itemDoPedido.produto_id);
        if (!estoque || estoque.quantidade < itemDoPedido.quantidade) {
            throw new ErroAplicacao(`Estoque insuficiente para o produto: ${produtoCorrespondente.nome}. Disponível: ${estoque ? estoque.quantidade : 0}`, 409); // 409 Conflict
        }

        // Adiciona o item com o preço do banco de dados para segurança
        itensParaVenda.push({
            ...itemDoPedido,
            preco_unitario: parseFloat(produtoCorrespondente.preco) // Usa o preço do banco!
        });

        valorTotalCalculado += produtoCorrespondente.preco * itemDoPedido.quantidade;
    }

    // Prepara o objeto final para enviar ao Model
    const dadosCompletosDaVenda = {
        ...outrosDados,
        cliente_id,
        usuario_id,
        valor_total: valorTotalCalculado,
        itens: itensParaVenda // Agora com o preço correto
    };

    // Chama o model que fará a transação no banco de dados
    const novaVenda = await saleModel.criarVenda(dadosCompletosDaVenda);

    return novaVenda;
}