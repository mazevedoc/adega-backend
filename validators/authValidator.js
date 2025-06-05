export function validarCadastro({ nome, email, cpf, senha, papel }) {
  if (!nome || !email || !cpf || !senha || !papel) {
    return "Todos os campos são obrigatórios.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.toLowerCase())) {
    return "Email inválido.";
  }

  const cpfLimpo = cpf.replace(/[^\d]/g, "");
  if (cpfLimpo.length !== 11) {
    return "CPF inválido.";
  }

  if (senha.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  const papeisPermitidos = ['admin', 'gerente', 'funcionario'];
  if (!papeisPermitidos.includes(papel)) {
    return "Papel inválido.";
  }

  return null;
}