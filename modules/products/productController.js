import {
    obterListaProdutos,
    buscarProdutoPorId,
    criarNovoProduto,
    atualizarProduto,
    deletarProduto,
    buscarProdutosComFiltros
} from './productService.js';

export const getTodosProdutos = async (req, res, next) => {
    try {
        const produtos = await obterListaProdutos();
        res.status(200).json(produtos);
    } catch (err) {
        next(err);
    }
};

export const getProdutoPorId = async (req, res, next) => {
    try {
        const produto = await buscarProdutoPorId(req.params.id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado.' });
        res.status(200).json(produto);
    } catch (err) {
        next(err);
    }
};

export const buscarProdutos = catchAsync(async (req, res) => {
    const { nome, categoria_id, fornecedor_id } = req.query;

    const filtros = {
        nome: nome || null,
        categoria_id: categoria_id ? Number(categoria_id) : null,
        fornecedor_id: fornecedor_id ? Number(fornecedor_id) : null
    };

    const produtos = await productService.buscarProdutosComFiltros(filtros);
    res.status(200).json(produtos);
});


export const postNovoProduto = async (req, res, next) => {
    try {
        const novoProduto = await criarNovoProduto(req.body);
        res.status(201).json(novoProduto);
    } catch (err) {
        next(err);
    }
};

export const putProduto = async (req, res, next) => {
    try {
        const produtoAtualizado = await atualizarProduto(req.params.id, req.body);
        if (!produtoAtualizado) return res.status(404).json({ erro: 'Produto não encontrado.' });
        res.status(200).json(produtoAtualizado);
    } catch (err) {
        next(err);
    }
};

export const deleteProduto = async (req, res, next) => {
    try {
        // A função do serviço agora retorna o produto deletado ou null.
        const produtoDeletado = await deletarProduto(req.params.id);

        // A verificação de "não encontrado" continua igual.
        if (!produtoDeletado) {
            throw new ErroAplicacao('Produto não encontrado.', 404);
        }

        // MUDANÇA: Em vez de 204, enviamos 200 com um corpo JSON de sucesso.
        res.status(200).json({
            status: 'sucesso',
            mensagem: 'Produto deletado com sucesso.',
            produto: produtoDeletado
        });

    } catch (err) {
        next(err);
    }
};