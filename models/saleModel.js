import db from '../config/database.js';

/**
 * Cria uma nova venda e seus itens, e atualiza o estoque DENTRO DE UMA TRANSAÇÃO.
 */
export async function criarVenda(dadosDaVenda) {
  const { cliente_id, usuario_id, valor_total, desconto, metodo_pagamento, status_pagamento, endereco_entrega, status, observacoes, itens } = dadosDaVenda;

  const client = await db.connect();

  try {
    await client.query('BEGIN');

    // 1. Inserir na tabela 'vendas'
    const vendaQuery = `
      INSERT INTO vendas (cliente_id, usuario_id, valor_total, desconto, metodo_pagamento, status_pagamento, endereco_entrega, status, observacoes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING venda_id, dtvenda;
    `;
    const vendaValores = [cliente_id, usuario_id, valor_total, desconto, metodo_pagamento, status_pagamento, endereco_entrega, status, observacoes];
    const resultadoVenda = await client.query(vendaQuery, vendaValores);
    const novaVenda = resultadoVenda.rows[0];

    for (const item of itens) {
      const subtotal = item.preco_unitario * item.quantidade;

      // 2. Inserir cada item na tabela 'itens_venda'
      const itensVendaQuery = `
        INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario, subtotal)
        VALUES ($1, $2, $3, $4, $5);
      `;
      await client.query(itensVendaQuery, [novaVenda.venda_id, item.produto_id, item.quantidade, item.preco_unitario, subtotal]);

      // 3. Atualizar o estoque
      const estoqueQuery = `
        UPDATE estoque SET quantidade = quantidade - $1 WHERE produto_id = $2;
      `;
      await client.query(estoqueQuery, [item.quantidade, item.produto_id]);

      // 4. Registrar a movimentação de estoque
      const movimentacaoQuery = `
        INSERT INTO movimentacoes_estoque 
            (produto_id, quantidade, tipo_movimentacao, motivo, usuario_id, referencia_id, tipo_referencia)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;
      const movimentacaoValores = [
        item.produto_id,       // $1: produto_id (CORRETO)
        -item.quantidade,      // $2: quantidade (negativa para saída) (CORRETO)
        'saida',               // $3: tipo_movimentacao
        'venda',               // $4: motivo
        usuario_id,            // $5: usuario_id
        novaVenda.venda_id,    // $6: referencia_id (o ID da venda)
        'venda'                // $7: tipo_referencia
      ];
      await client.query(movimentacaoQuery, movimentacaoValores);
    }

    await client.query('COMMIT');

    return novaVenda;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getVendasPorClienteId(clienteId) {
    const { rows } = await db.query('SELECT venda_id FROM vendas WHERE cliente_id = $1 LIMIT 1;', [clienteId]);
    return rows;
}