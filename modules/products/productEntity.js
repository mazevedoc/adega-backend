export class ProductEntity {
    constructor({
        produto_id,
        nome,
        descricao,
        categoria_id,
        fornecedor_id,
        teor_alcoolico,
        volume_ml,
        preco,
        preco_custo,
        sku,
        codigo_barras,
        url_imagem,
        ativo,
        dtcriacao,
        dtultalteracao
    }) {
        this.produto_id = produto_id;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria_id = categoria_id;
        this.fornecedor_id = fornecedor_id;
        this.teor_alcoolico = teor_alcoolico;
        this.volume_ml = volume_ml;
        this.preco = preco;
        this.preco_custo = preco_custo;
        this.sku = sku;
        this.codigo_barras = codigo_barras;
        this.url_imagem = url_imagem;
        this.ativo = ativo;
        this.dtcriacao = dtcriacao;
        this.dtultalteracao = dtultalteracao;
    }
}