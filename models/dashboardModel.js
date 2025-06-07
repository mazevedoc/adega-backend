import db from '../config/database.js';

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

export const getProdutosResumo = async () => {
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