import ErroAplicacao from '../utils/appError.js';
import { registrarErro } from '../utils/logger.js';

const tratarErroDeChaveUnicaDB = (erro) => {
  const campo = erro.detail.match(/\((.*?)\)/)?.[1] || 'desconhecido';
  const valor = erro.detail.match(/\)=\((.*?)\)/)?.[1] || 'desconhecido';
  const mensagem = `O valor '${valor}' para o campo '${campo}' já está em uso.`;
  return new ErroAplicacao(mensagem, 409);
};

const tratarErroDeChaveEstrangeiraDB = (erro) => {
  const mensagem = `A referência que você está tentando usar não existe. Verifique os IDs fornecidos.`;
  return new ErroAplicacao(mensagem, 400);
};

const tratarErroJWT = () => new ErroAplicacao('Token inválido. Por favor, faça login novamente.', 401);
const tratarErroTokenExpiradoJWT = () => new ErroAplicacao('Seu token expirou. Por favor, faça login novamente.', 401);

const enviarErroDev = (erro, resposta) => {
  resposta.status(erro.codigoStatus).json({
    status: erro.status,
    mensagem: erro.message,
    erro: erro,
    stack: erro.stack,
  });
};

const enviarErroProd = (erro, req, resposta) => {
  if (erro.eOperacional) {
    return resposta.status(erro.codigoStatus).json({
      status: erro.status,
      mensagem: erro.message,
    });
  }

  const logMessage = `${erro.codigoStatus || 500} - ${erro.message} - ${req.originalUrl} - ${req.method} - ${req.ip}\nStack: ${erro.stack}`;
  registrarErro(logMessage);

  return resposta.status(500).json({
    status: 'erro',
    mensagem: 'Algo deu muito errado no servidor!',
  });
};

const manipuladorDeErroGlobal = (erro, req, resposta, next) => {
  erro.codigoStatus = erro.codigoStatus || 500;
  erro.status = erro.status || 'erro';

  if (process.env.NODE_ENV === 'development') {
    enviarErroDev(erro, resposta);
  } else if (process.env.NODE_ENV === 'production') {
    let erroTratado = { ...erro, message: erro.message, detail: erro.detail };

    if (erro.code === '23505') erroTratado = tratarErroDeChaveUnicaDB(erro);
    if (erro.code === '23503') erroTratado = tratarErroDeChaveEstrangeiraDB(erro);
    if (erro.name === 'JsonWebTokenError') erroTratado = tratarErroJWT();
    if (erro.name === 'TokenExpiredError') erroTratado = tratarErroTokenExpiradoJWT();

    enviarErroProd(erroTratado, req, resposta);
  }
};

export default manipuladorDeErroGlobal;