export function validarCadastro({ nome, email, cpf, senha, papel }) {
  // Verificação de campos obrigatórios
  if (!nome?.trim() || !email?.trim() || !cpf?.trim() || !senha?.trim() || !papel?.trim()) {
    return "Todos os campos são obrigatórios.";
  }

  // Validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.toLowerCase())) {
    return "Email inválido.";
  }

  // Validação de CPF
  const cpfLimpo = cpf.replace(/[^\d]/g, "");
  if (cpfLimpo.length !== 11) {
    return "CPF deve conter 11 dígitos numéricos.";
  }

  // Validação de senha
  if (senha.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  // Validação de papel
  const papeisPermitidos = ['admin', 'gerente', 'funcionario'];
  if (!papeisPermitidos.includes(papel.toLowerCase())) {
    return "Papel inválido. Deve ser: admin, gerente ou funcionario.";
  }

  return null;
}