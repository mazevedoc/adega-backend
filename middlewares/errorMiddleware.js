import ErroAplicacao from '../utils/appError.js';

// Trata erros de chave única (duplicada)
const tratarErroDeChaveUnicaDB = (erro) => {
  const campo = Object.keys(erro.fields)[0];
  const valor = Object.values(erro.fields)[0];
  const mensagem = `O campo '${campo}' com o valor '${valor}' já existe. Por favor, utilize outro valor.`;
  return new ErroAplicacao(mensagem, 409); // 409: Conflito
};

const tratarErroDeValidacaoDB = (erro) => {
  const listaDeErros = Object.values(erro.errors).map(el => el.message);
  const mensagem = `Dados de entrada inválidos. ${listaDeErros.join('. ')}`;
  return new ErroAplicacao(mensagem, 400); // 400: Requisição Inválida
};

// Trata erros de token JWT inválido.
const tratarErroJWT = () =>
  new ErroAplicacao('Token inválido. Por favor, faça login novamente.', 401); // 401: Não Autorizado

// Trata erros de token JWT expirado.
const tratarErroTokenExpiradoJWT = () =>
  new ErroAplicacao('Seu token expirou. Por favor, faça login novamente.', 401); // 401: Não Autorizado

// Função para enviar erros detalhados no ambiente de desenvolvimento.
const enviarErroDev = (erro, resposta) => {
  resposta.status(erro.codigoStatus).json({
    status: erro.status,
    erro: erro,
    mensagem: erro.message,
    stack: erro.stack,
  });
};

// Função para enviar erros amigáveis no ambiente de produção.
const enviarErroProd = (erro, resposta) => {
  // Se o erro for operacional (previsto), envia a mensagem para o cliente.
  if (erro.eOperacional) {
    return resposta.status(erro.codigoStatus).json({
      status: erro.status,
      mensagem: erro.message,
    });
  }

  // Se for um erro de programação ou desconhecido, não vaza detalhes.
  // 1. Loga o erro no console para o desenvolvedor.
  console.error('ERRO  CRÍTICO 💥:', erro);
  // 2. Envia uma mensagem genérica.
  return resposta.status(500).json({
    status: 'erro',
    mensagem: 'Algo deu muito errado no servidor!',
  });
};

// ==========================================
// FUNÇÃO PRINCIPAL DO MIDDLEWARE (EXPORTADA)
// ==========================================
const manipuladorDeErroGlobal = (erro, req, resposta, next) => {
  erro.codigoStatus = erro.codigoStatus || 500;
  erro.status = erro.status || 'erro';

  if (process.env.NODE_ENV === 'development') {
    enviarErroDev(erro, resposta);
  } else if (process.env.NODE_ENV === 'production') {
    // Cria uma cópia do erro para não modificar o objeto original.
    let erroTratado = { ...erro, name: erro.name, message: erro.message, fields: erro.fields, errors: erro.errors };

    // Converte erros específicos em erros operacionais amigáveis.
    if (erroTratado.name === 'SequelizeUniqueConstraintError') {
      erroTratado = tratarErroDeChaveUnicaDB(erroTratado);
    }
    if (erroTratado.name === 'SequelizeValidationError') {
      erroTratado = tratarErroDeValidacaoDB(erroTratado);
    }
    if (erroTratado.name === 'JsonWebTokenError') {
      erroTratado = tratarErroJWT();
    }
    if (erroTratado.name === 'TokenExpiredError') {
      erroTratado = tratarErroTokenExpiradoJWT();
    }

    enviarErroProd(erroTratado, resposta);
  }
};

export default manipuladorDeErroGlobal;