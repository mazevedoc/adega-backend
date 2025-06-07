import {
    getTotalVendas,
    getTotalProdutosEstoque,
    getProdutosEstoqueBaixo,
    getVendasHoje,
    getVendasPorMes,
    getUltimasVendas,
    getProdutosResumo
} from '../../models/dashboardModel.js';


const traduzirMes = (abreviadoEn) => {
    const mapa = {
        Jan: 'Jan', Feb: 'Fev', Mar: 'Mar', Apr: 'Abr', May: 'Mai',
        Jun: 'Jun', Jul: 'Jul', Aug: 'Ago', Sep: 'Set', Oct: 'Out',
        Nov: 'Nov', Dec: 'Dez'
    };
    return mapa[abreviadoEn] || abreviadoEn;
};

// Utilitário simples para "tempo atrás"
const formatarTempoAtras = (data) => {
    const agora = new Date();
    const venda = new Date(data);
    const diffMs = agora - venda;
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias === 0) return 'hoje';
    if (diffDias === 1) return '1 dia atrás';
    return `${diffDias} dias atrás`;
};

export const buscarResumo = async () => {
    const [totalVendas, produtosEstoque, estoqueBaixo, vendasHoje] = await Promise.all([
        getTotalVendas(),
        getTotalProdutosEstoque(),
        getProdutosEstoqueBaixo(),
        getVendasHoje()
    ]);

    return {
        totalVendas,
        produtosEstoque,
        estoqueBaixo,
        vendasHoje
    };
};

export const buscarVendasPorMes = async () => {
    const vendasPorMesBrutas = await getVendasPorMes();

    const vendasFormatadas = vendasPorMesBrutas.map(row => ({
        mes: traduzirMes(row.mes), // Aplica a tradução aqui
        total: parseFloat(row.total)
    }));

    return getVendasPorMes();
};

export const buscarUltimasVendas = async () => {
    const ultimasVendasBrutas = await getUltimasVendas();

    const vendasFormatadas = ultimasVendasBrutas.map(venda => ({
        cliente: venda.cliente,
        // Aplica a formatação na data bruta recebida
        data: formatarTempoAtras(venda.dtvenda),
        valor: parseFloat(venda.valor_total)
    }));

    return vendasFormatadas;
};

export const buscarProdutosResumo = async () => {
    const produtosBrutos = await getProdutosResumo();
    return produtosBrutos.map(produto => ({
        ...produto,
        preco: parseFloat(produto.preco),
        estoque: parseInt(produto.estoque),
        avaliacao: parseFloat(produto.avaliacao)
    }));
};