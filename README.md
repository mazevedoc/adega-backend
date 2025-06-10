# 🍇 Adega ERP - Back-end

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![OnRender](https://img.shields.io/badge/Deploy-Render-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql\&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis\&logoColor=white)

---

## 📌 Descrição

Este é o back-end da aplicação **Adega ERP**, um sistema de gestão para adegas desenvolvido para proporcionar controle eficiente de vendas, produtos, clientes e usuários.

🌟 O projeto é focado em escalabilidade, segurança e organização modular, seguindo boas práticas de desenvolvimento web.
Integra autenticação JWT, proteção contra ataques e integração com banco de dados PostgreSQL.

---

## 🧾p Funcionalidades

* ✅ API RESTful modularizada
* ✅ Autenticação e autorização de usuários via JWT
* ✅ Controle de acesso por papel (admin, gerente, funcionário)
* ✅ Gerenciamento de:

  * 📦 Produtos
  * 🗂️ Categorias
  * 👥 Clientes
  * 💼 Fornecedores
  * 📝 Vendas
  * 👍 Relatórios
* ✅ Validação de CPF e e-mail
* ✅ Integração com serviços de pagamento
* ✅ Serviço de envio de e-mails transacionais
* ✅ Proteção contra ataques de força bruta (Rate Limiting com Redis)
* ✅ Estrutura escalável e de fácil manutenção

---

## 🛠 Tecnologias Utilizadas

### 🖥️ Back-end

* **Node.js** – Ambiente de execução JavaScript
* **Express** – Framework de rotas e middlewares
* **PostgreSQL** – Banco de dados relacional
* **Redis** – Controle de requisições e cache
* **JWT** – Autenticação via tokens
* **Joi & Express Validator** – Validações robustas
* **Bcrypt** – Criptografia de senhas
* **Render** – Hospedagem do back-end e banco

---

## 🗂️ Estrutura do Projeto

```text
adega-backend/
│
├── config/          # Configurações e conexões
├── logs/            # Logs da aplicação
├── middlewares/     # Autenticação, rate limit e tratamento de erros
├── models/          # Data Access Layer (queries e conexões)
├── modules/         # Módulos organizados por contexto (auth, sales, etc)
├── routes/          # Definição das rotas da API
├── services/        # Integração com serviços externos (e-mail, pagamento)
├── utils/           # Funções auxiliares
│
├── app.js           # Configuração principal do Express
├── server.js        # Inicialização do servidor
├── .env             # Variáveis de ambiente
└── package.json     # Scripts e dependências
```

---

## 🚀 Como Executar Localmente

```bash
# Instalar as dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar em modo produção
npm start
```

### Pré-requisitos:

* Node.js 18 ou superior
* PostgreSQL configurado
* Redis opcional (recomendado para controle de requisições)

---

## 🔑 Configuração do Ambiente (.env)

```env
PORT=3000
DATABASE_URL=postgres://usuario:senha@host:5432/adega
JWT_SECRET=sua_chave_secreta
REDIS_URL=redis://localhost:6379
```

---

## 🗒️ Rotas Principais (Exemplos)

| Método | Rota               | Descrição                  |
| ------ | ------------------ | -------------------------- |
| POST   | /api/auth/login    | Login de usuários          |
| POST   | /api/auth/register | Registro de novos usuários |
| GET    | /api/products      | Listar produtos            |
| POST   | /api/products      | Criar produto              |
| GET    | /api/sales         | Listar vendas              |
| POST   | /api/sales         | Criar nova venda           |
| GET    | /api/reports       | Gerar relatórios de vendas |

> **Obs:** A autenticação JWT é obrigatória para rotas protegidas.

---

## 🔒 Autenticação JWT

### Exemplo de Header:

```http
Authorization: Bearer {seu_token}
```

### Perfis Disponíveis:

* **Admin:** Acesso completo
* **Gerente:** Gerenciamento operacional
* **Funcionário:** Acesso restrito a vendas e clientes

---

## 📨 Contato

Para dúvidas, suporte ou customizações, entre em contato:
**Email:** [atendimento@adegaerp.com](mailto:atendimento@adegaerp.com)

---

## 👨‍💻 Desenvolvedor

| Nome           | GitHub                                     |
| -------------- | ------------------------------------------ |
| Melque Azevedo | [@mazevedoc](https://github.com/mazevedoc) |

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🛠️ Melhorias Futuras

* 🔵 Documentação completa via Swagger UI
* 🔵 Collection Postman oficial
* 🔵 Dashboard de métricas de API
* 🔵 Testes automatizados com cobertura
