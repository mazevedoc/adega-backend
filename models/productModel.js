import db from '../config/database.js';

export const buscarTodosProdutos = async () => {
    const { rows } = await db.query('SELECT * FROM produtos ORDER BY produto_id');
    return rows;
};

export const buscarProdutoPorId = async (id) => {
    const { rows } = await db.query('SELECT * FROM produtos WHERE produto_id = $1', [id]);
    return rows[0];
};

export const buscarPorSku = async (sku) => {
    const { rows } = await db.query('SELECT produto_id FROM produtos WHERE sku = $1', [sku]);
    return rows[0];
};

export const inserirProduto = async (produto) => {
    const {
        nome, descricao, categoria_id, fornecedor_id, teor_alcoolico, volume_ml,
        preco, preco_custo, sku, codigo_barras, url_imagem, ativo
    } = produto;

    const query = `
    INSERT INTO produtos (
      nome, descricao, categoria_id, fornecedor_id, teor_alcoolico,
      volume_ml, preco, preco_custo, sku, codigo_barras, url_imagem, ativo
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING *;
  `;
    const values = [
        nome, descricao, categoria_id, fornecedor_id, teor_alcoolico,
        volume_ml, preco, preco_custo, sku, codigo_barras, url_imagem, ativo ?? true
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
};

export const atualizarProdutoPorId = async (id, produto) => {
    const {
        nome, descricao, categoria_id, fornecedor_id, teor_alcoolico, volume_ml,
        preco, preco_custo, sku, codigo_barras, url_imagem, ativo
    } = produto;

    const query = `
    UPDATE produtos SET
      nome = $1, descricao = $2, categoria_id = $3, fornecedor_id = $4,
      teor_alcoolico = $5, volume_ml = $6, preco = $7, preco_custo = $8,
      sku = $9, codigo_barras = $10, url_imagem = $11, ativo = $12,
      dtultalteracao = CURRENT_TIMESTAMP
    WHERE produto_id = $13
    RETURNING *;
  `;
    const values = [
        nome, descricao, categoria_id, fornecedor_id, teor_alcoolico, volume_ml,
        preco, preco_custo, sku, codigo_barras, url_imagem, ativo, id
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
};

export const deletarProdutoPorId = async (id) => {
    const { rowCount } = await db.query('DELETE FROM produtos WHERE produto_id = $1', [id]);
    return rowCount > 0;
};