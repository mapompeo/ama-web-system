# AMA Web System

<a href="https://ama-web-system.onrender.com/">
  <img src="frontend/public/images/ama-dashboard.png" width="800" alt="AMA Web System">
</a>

Sistema web desenvolvido para a **Associação Palmira Gobbi Amigo dos Amigos (AMA ONG)** - digitaliza o cadastro de animais e atividades em uma plataforma acessível pelo navegador.

**Acesse:** [https://ama-web-system.onrender.com/](https://ama-web-system.onrender.com/)

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5, CSS3, Bootstrap 5, Bootstrap Icons |
| Backend | Node.js 18+ / Express 4 |
| Banco de Dados | PostgreSQL (Supabase) |
| Autenticação | JWT + bcrypt |
| Upload de PDF | express-fileupload |
| Deploy | Render |

---

## Estrutura do Projeto

```
ama-web-system/
├── backend/
│   ├── database/
│   │   ├── schema.pg.sql         # Criação das tabelas (PostgreSQL)
│   │   └── seed.pg.sql           # Dados realistas (50+ registros)
│   ├── src/
│   │   ├── config/database.js    # Pool de conexão PostgreSQL
│   │   ├── controllers/          # Lógica de negócio
│   │   ├── middlewares/auth.js   # Proteção de rotas (JWT)
│   │   ├── models/               # Acesso ao banco
│   │   ├── routes/               # Rotas Express
│   │   └── app.js                # Ponto de entrada
│   ├── uploads/contracts/        # PDFs dos contratos de adoção
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── css/style.css
│   │   ├── js/
│   │   │   ├── api.js            # Cliente HTTP com prefixo /api
│   │   │   ├── layout.js         # Navbar / sidebar / tema
│   │   │   └── pages/            # Lógica por página
│   │   └── images/               # Logos, favicon, screenshot
│   ├── login.html
│   ├── dashboard.html
│   ├── animais.html              # Lista de animais
│   ├── animais-form.html         # Cadastro/edição + contratos
│   ├── atividades.html           # Lista de atividades
│   ├── atividades-form.html      # Cadastro/edição de atividades
│   ├── historico.html            # Histórico clínico por animal
│   └── 404.html
└── README.md
```

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL (ou conta no Supabase / Neon)

### 1. Clone o repositório

```bash
git clone https://github.com/mapompeo/ama-web-system.git
cd ama-web-system
```

### 2. Instale as dependências

```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:senha@host:5432/postgres
NODE_ENV=development
JWT_SECRET=uma_chave_segura_aqui
```

### 4. Crie o banco de dados e popule

Execute no SQL Editor do Supabase (ou via psql):

1. `backend/database/schema.pg.sql` - cria as tabelas + admin
2. `backend/database/seed.pg.sql` - dados completos (opcional)

### 5. Inicie o servidor

```bash
cd backend
npm run dev    # desenvolvimento (com nodemon)
npm start      # produção
```

Acesse: **http://localhost:3000**

---

## Credenciais de Demonstração

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Visitante | `demo@ama.org.br` | 2bPIak1e6A;H |

> Use o usuário acima para explorar o sistema. Os dados de demonstração são independentes dos dados reais da ONG.

---

## Deploy (Produção)

Hospedado em: **[https://ama-web-system.onrender.com/](https://ama-web-system.onrender.com/)**

### Configuração no Render

| Parâmetro | Valor |
|-----------|-------|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node src/app.js` |

### Variáveis de Ambiente no Render

| Chave | Valor |
|-------|-------|
| `DATABASE_URL` | Connection string do Supabase (Session Pooler) |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Chave secreta aleatória |

---

## Funcionalidades

- **Login e logout** com JWT, sessão persistente
- **Dashboard** com estatísticas em tempo real (animais ativos, atividades agendadas, gráfico mensal, ações rápidas)
- **Animais** - cadastro, edição, listagem e remoção com fotos; URLs amigáveis (`/animais/1`)
- **Contratos de Adoção** - upload de PDF com múltiplos contratos por animal; visualização inline (modal com iframe) e download
- **Histórico clínico** - registro de procedimentos por animal (`/historico/1`)
- **Atividades** - cadastro, edição, listagem e remoção com filtros por status (Agendada/Realizada/Cancelada) e busca textual
- **Tema claro/escuro** com persistência em `localStorage`
- **Interface responsiva** - adaptada para desktop, tablet e mobile com offcanvas sidebar, tabelas com scroll horizontal e cards em grid
- **Rotas em português** - `/animais`, `/atividades`, `/historico`

---

## Segurança

- Senhas armazenadas com **bcrypt** (salt rounds: 10)
- Proteção contra **SQL Injection** via queries parametrizadas
- Rotas protegidas por middleware JWT
- Variáveis sensíveis via `.env` (nunca commitadas)
- Rate limiting no login (10 tentativas / 15 min)

---

## Equipe

| Nome | Função |
|------|--------|
| José Gabriel Santos Gomes | Desenvolvedor Fullstack |
| Kaio Otavio de Oliveira Situlino | UI/UX Design e Front-end |
| Matheus Pompeo Dias | Desenvolvedor Fullstack |
| Nathan Reichert | Banco de Dados e Documentação |

**Orientador:** Prof. Dr. Jhonatan Alves

---

## Documentação

A pasta [`docs/`](./docs/) contém os relatórios e cartas do projeto de extensão.
