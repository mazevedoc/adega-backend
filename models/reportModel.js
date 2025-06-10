import db from '../config/database.js';

/**
 * Busca o ranking de produtos mais ou menos vendidos, com filtros opcionais.
 */
export async function getRankingDeProdutos({ dataInicio, dataFim, ordem = 'desc', limite = 10 }) {
    const params = [];
    let query = `
    SELECT 
        p.produto_id, 
        p.nome, 
        p.sku,
        SUM(iv.quantidade) as total_vendido
    FROM 
        itens_venda iv
    JOIN 
        produtos p ON iv.produto_id = p.produto_id
    JOIN
        vendas v ON iv.venda_id = v.venda_id
  `;

    // Adiciona filtro de data se os parâmetros forem fornecidos
    if (dataInicio && dataFim) {
        params.push(dataInicio, dataFim);
        query += ` WHERE v.dtvenda BETWEEN $${params.length - 1} AND $${params.length}`;
    }

    query += `
    GROUP BY 
        p.produto_id, p.nome, p.sku
    ORDER BY 
        total_vendido ${ordem === 'asc' ? 'ASC' : 'DESC'}
  `;

    // Adiciona limite de resultados
    params.push(limite);
    query += ` LIMIT $${params.length}`;

    const { rows } = await db.query(query, params);
    return rows;
}

export async function getVendasPorPeriodo({ dataInicio, dataFim }) {
    const query = `
    SELECT 
        DATE_TRUNC('day', dtvenda)::date as dia,
        COUNT(venda_id)::int as quantidade_vendas,
        SUM(valor_total) as faturamento_total
    FROM 
        vendas
    WHERE 
        dtvenda BETWEEN $1 AND $2
    GROUP BY 
        dia
    ORDER BY 
        dia ASC;
  `;

    const { rows } = await db.query(query, [dataInicio, dataFim]);
    return rows;
}

export const getTotalVendas = async () => {
    const result = await db.query('SELECT COALESCE(SUM(valor_total), 0) AS total FROM vendas');
    return parseFloat(result.rows[0].total);
};

export const getTotalProdutosEstoque = async () => {
    const result = await db.query('SELECT COALESCE(SUM(quantidade), 0) AS total FROM estoque');
    return parseInt(result.rows[0].total);
};

export const getProdutosEstoqueBaixo = async () => {
    // A query agora junta produtos e estoque e compara a quantidade com o estoque_minimo
    const result = await db.query(`
        SELECT COUNT(p.produto_id) AS quantidade 
        FROM produtos p
        JOIN estoque e ON p.produto_id = e.produto_id
        WHERE e.quantidade < e.estoque_minimo
    `);
    return parseInt(result.rows[0].quantidade);
};

export const getVendasHoje = async () => {
    const result = await db.query(`
    SELECT COALESCE(SUM(valor_total), 0) AS total
    FROM vendas
    WHERE DATE(dtvenda) = CURRENT_DATE
  `);
    return parseFloat(result.rows[0].total);
};

export const getVendasPorMes = async () => {
    const result = await db.query(`
    SELECT 
      TO_CHAR(dtvenda, 'Mon') AS mes,
      EXTRACT(MONTH FROM dtvenda) AS mes_num,
      SUM(valor_total) AS total
    FROM vendas
    WHERE EXTRACT(YEAR FROM dtvenda) = EXTRACT(YEAR FROM CURRENT_DATE)
    GROUP BY mes, mes_num
    ORDER BY mes_num
  `);

    return result.rows;
};

export const getUltimasVendas = async () => {
    const result = await db.query(`
    SELECT 
      c.nome AS cliente,
      v.dtvenda,
      v.valor_total
    FROM vendas v
    JOIN clientes c ON v.cliente_id = c.cliente_id
    ORDER BY v.dtvenda DESC
    LIMIT 5
  `);

    return result.rows;
};

export const getResumo = async () => {
    const result = await db.query(`
        SELECT 
            p.nome,
            p.descricao,
            p.preco,
            e.quantidade AS estoque,
            -- Calcula a média das avaliações e arredonda para 1 casa decimal
            COALESCE((SELECT AVG(a.avaliacao) FROM avaliacoes a WHERE a.produto_id = p.produto_id), 0) AS avaliacao
        FROM produtos p
        LEFT JOIN estoque e ON p.produto_id = e.produto_id
        ORDER BY p.nome
        LIMIT 10
    `);

    return result.rows;
};