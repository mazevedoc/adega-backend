import * as reportModel from '../../models/reportModel.js';
import ErroAplicacao from '../../utils/appError.js';

const traduzirMes = (abreviadoEn) => {
    const mapa = { 'Jan': 'Jan', 'Feb': 'Fev', 'Mar': 'Mar', 'Apr': 'Abr', 'May': 'Mai', 'Jun': 'Jun', 'Jul': 'Jul', 'Aug': 'Ago', 'Sep': 'Set', 'Oct': 'Out', 'Nov': 'Nov', 'Dec': 'Dez' };
    return mapa[abreviadoEn.trim()] || abreviadoEn;
};

const formatarTempoAtras = (data) => {
    const agora = new Date();
    const venda = new Date(data);
    const diffMs = agora - venda;
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDias < 1) return 'hoje';
    if (diffDias === 1) return '1 dia atrás';
    return `${diffDias} dias atrás`;
};

export async function getResumo() {
    const [totalVendas, produtosEstoque, estoqueBaixo, vendasHoje] = await Promise.all([
        reportModel.getTotalVendas(),
        reportModel.getTotalProdutosEstoque(),
        reportModel.getProdutosEstoqueBaixo(),
        reportModel.getVendasHoje()
    ]);
    return { totalVendas, produtosEstoque, estoqueBaixo, vendasHoje };
}

export async function getVendasPorMes() {
    const vendasBrutas = await reportModel.getVendasPorMes();
    return vendasBrutas.map(row => ({
        mes: traduzirMes(row.mes),
        total: parseFloat(row.total)
    }));
}

export async function getUltimasVendas() {
    const vendasBrutas = await reportModel.getUltimasVendas();
    return vendasBrutas.map(venda => ({
        cliente: venda.cliente,
        data: formatarTempoAtras(venda.dtvenda),
        valor: parseFloat(venda.valor_total)
    }));
}

export async function getResumoDeProdutos() {
    const produtosBrutos = await reportModel.getProdutosResumo();
    return produtosBrutos.map(produto => ({
        ...produto,
        preco: parseFloat(produto.preco),
        estoque: parseInt(produto.estoque),
        avaliacao: parseFloat(produto.avaliacao)
    }));
}

/**
 * Valida os filtros e busca o ranking de produtos.
 */
export async function getRankingDeProdutos(filtros) {
    const ordem = ['asc', 'desc'].includes(filtros.ordem?.toLowerCase()) ? filtros.ordem.toLowerCase() : 'desc';
    const limite = parseInt(filtros.limite, 10);
    const limiteValido = !isNaN(limite) && limite > 0 && limite <= 100 ? limite : 10;

    const opcoes = {
        dataInicio: filtros.dataInicio,
        dataFim: filtros.dataFim,
        ordem,
        limite: limiteValido,
    };

    const ranking = await reportModel.getRankingDeProdutos(opcoes);
    return ranking;
}

/**
 * Valida as datas e busca o relatório de vendas por período.
 */
export async function getVendasPorPeriodo(filtros) {
    let { dataInicio, dataFim } = filtros;

    if (!dataInicio || !dataFim) {
        const hoje = new Date(); 

        const fimDoDia = new Date(hoje);
        fimDoDia.setUTCHours(23, 59, 59, 999);
        dataFim = fimDoDia.toISOString();

        const inicioDoDia = new Date(hoje);
        inicioDoDia.setDate(hoje.getDate() - 30);
        inicioDoDia.setUTCHours(0, 0, 0, 0);
        dataInicio = inicioDoDia.toISOString();

    } else {
        const regexData = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexData.test(dataInicio) || !regexData.test(dataFim)) {
            throw new ErroAplicacao('As datas devem estar no formato YYYY-MM-DD.', 400);
        }

        dataInicio = `${dataInicio}T00:00:00.000Z`;
        dataFim = `${dataFim}T23:59:59.999Z`;
    }

    const relatorioBruto = await reportModel.getVendasPorPeriodo({ dataInicio, dataFim });

    const relatorioFormatado = relatorioBruto.map(item => ({
        ...item,
        dia: new Date(item.dia).toISOString().split('T')[0]
    }));

    return relatorioFormatado;
}