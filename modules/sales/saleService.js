import * as saleModel from '../../models/saleModel.js';
import * as productModel from '../../models/productModel.js';
import * as clientModel from '../../models/clientModel.js';
import ErroAplicacao from '../../utils/appError.js';

export async function registrarVenda(dadosDoPedido, usuarioLogado) {
    const { cliente_id, itens, ...outrosDados } = dadosDoPedido;
    const { id: usuario_id, papel: usuario_papel } = usuarioLogado;

    if (!itens || itens.length === 0) {
        throw new ErroAplicacao('A venda deve conter pelo menos um item.', 400);
    }

    /*
    //VERIFICAR SE O CLIENTE EXISTE ANTES DE PROSSEGUIR
    const clienteExiste = await clientModel.buscarPorId(cliente_id);
    if (!clienteExiste) {
        throw new ErroAplicacao('O cliente especificado para esta venda não foi encontrado.', 404);
    }
    */

    const idsDeProdutos = itens.map(item => item.produto_id);
    const produtosDoBanco = await productModel.buscarVariosPorId(idsDeProdutos);

    if (produtosDoBanco.length !== idsDeProdutos.length) {
        throw new ErroAplicacao('Um ou mais produtos no pedido não foram encontrados.', 404);
    }

    let valorTotalCalculado = 0;
    const itensParaVenda = [];

    for (const itemDoPedido of itens) {
        const produtoCorrespondente = produtosDoBanco.find(p => p.produto_id === itemDoPedido.produto_id);
        const estoque = await productModel.buscarEstoquePorProdutoId(itemDoPedido.produto_id);

        if (!estoque || estoque.quantidade < itemDoPedido.quantidade) {
            throw new ErroAplicacao(`Estoque insuficiente para o produto: ${produtoCorrespondente.nome}. Disponível: ${estoque ? estoque.quantidade : 0}`, 409);
        }

        itensParaVenda.push({
            ...itemDoPedido,
            preco_unitario: parseFloat(produtoCorrespondente.preco)
        });
        valorTotalCalculado += produtoCorrespondente.preco * itemDoPedido.quantidade;
    }

    const dadosCompletosDaVenda = {
        ...outrosDados,
        cliente_id,
        usuario_id,
        valor_total: valorTotalCalculado,
        itens: itensParaVenda
    };

    const novaVenda = await saleModel.criarVenda(dadosCompletosDaVenda);
    return novaVenda;
}