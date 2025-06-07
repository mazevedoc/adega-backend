class ErroAplicacao extends Error {
  /**
   * @param {string} mensagem A mensagem de erro para o cliente.
   * @param {number} codigoStatus O código de status HTTP.
   */
  constructor(mensagem, codigoStatus) {
    super(mensagem);

    this.codigoStatus = codigoStatus;
    // Define o status como 'falha' para erros 4xx e 'erro' para 5xx.
    this.status = `${codigoStatus}`.startsWith('4') ? 'falha' : 'erro';
    // Erros operacionais são erros previstos (ex: email duplicado, dados faltando).
    this.eOperacional = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErroAplicacao;