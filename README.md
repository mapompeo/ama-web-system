# AMA Web System

Sistema web desenvolvido para a **Associação Palmira Gobbi Amigo dos Amigos (AMA ONG)** como projeto de extensão universitária — disciplina de **Programação Web**, Ciência da Computação, Univali (2025/1).

O sistema digitaliza os processos internos da ONG, centralizando o cadastro de voluntários, atendidos e atividades em uma plataforma acessível pelo navegador.

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5, CSS3, Bootstrap 5, Bootstrap Icons, EJS |
| Backend | Node.js 18+ + Express 4 |
| Banco de Dados | MySQL 8 |
| Autenticação | Sessão + bcrypt |
| Arquitetura | MVC (Model-View-Controller) |

---

## Estrutura do Projeto

```
ama-web-system/
├── backend/                        # Servidor Node.js (Express)
│   ├── database/
│   │   └── schema.sql              # Script de criação das tabelas + dados iniciais
│   ├── src/
│   │   ├── config/database.js      # Pool de conexão MySQL
│   │   ├── controllers/            # Lógica de negócio (Auth, Dashboard, CRUD)
│   │   ├── middlewares/auth.js     # Proteção de rotas autenticadas
│   │   ├── models/                 # Acesso ao banco (User, Volunteer, Beneficiary, Activity)
│   │   ├── routes/                 # Rotas Express por módulo
│   │   └── app.js                  # Ponto de entrada
│   ├── .env.example
│   └── package.json
├── frontend/                       # Interface do usuário
│   ├── public/
│   │   ├── css/style.css
│   │   └── js/main.js
│   └── views/
│       ├── partials/               # head.ejs, sidebar.ejs, alerts.ejs
│       └── pages/                  # login, dashboard, volunteers, beneficiaries, activities
├── docs/                           # Documentação institucional (PDF)
├── src/
│   ├── config/database.js      # Pool de conexão MySQL
│   ├── controllers/            # Lógica de negócio (Auth, Dashboard, CRUD)
│   ├── middlewares/auth.js     # Proteção de rotas autenticadas
│   ├── models/                 # Acesso ao banco (User, Volunteer, Beneficiary, Activity)
│   ├── routes/                 # Rotas Express por módulo
│   └── app.js                  # Ponto de entrada
├── views/
│   ├── partials/               # head.ejs, sidebar.ejs, alerts.ejs
│   └── pages/                  # login, dashboard, volunteers, beneficiaries, activities
├── .env.example
└── package.json
```

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- MySQL 8+

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

Edite o `.env` com seus dados:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=ama_db
SESSION_SECRET=troque_por_uma_chave_segura
```

### 4. Crie o banco de dados e popule

```bash
mysql -u root -p < backend/database/schema.sql
```

Ou execute o conteúdo de `backend/database/schema.sql` diretamente no seu cliente MySQL (DBeaver, MySQL Workbench, etc.).

### 5. Inicie o servidor

```bash
cd backend
npm run dev     # desenvolvimento (nodemon, recarrega automaticamente)
npm start       # produção
```

Acesse: **http://localhost:3000**

---

## Usuário de Demonstração

| Campo | Valor |
|-------|-------|
| E-mail | `admin@amaong.org` |
| Senha | `password` |
| Perfil | Administrador |

---

## Banco de Dados

O arquivo `database/schema.sql` cria automaticamente:

- Banco `ama_db`
- Tabelas: `users`, `volunteers`, `beneficiaries`, `activities`
- Dados iniciais: 1 usuário admin, 3 voluntários, 2 atendidos e 2 atividades de exemplo

---

## Deploy (Produção)

Sistema hospedado em: **[em breve — adicionar link após deploy]**

### Opção recomendada: Railway

O Railway suporta Node.js + MySQL gratuitamente em um único projeto:

1. Crie uma conta em [railway.app](https://railway.app)
2. Novo projeto → "Deploy from GitHub repo" → selecione este repositório
3. Adicione um serviço MySQL no mesmo projeto
4. Configure as variáveis de ambiente (mesmo conteúdo do `.env`)
5. Execute o `schema.sql` no banco do Railway para criar as tabelas

---

## Funcionalidades

- Login e logout com sessão segura
- Dashboard com estatísticas em tempo real
- **Voluntários** — cadastro, edição, listagem e remoção
- **Atendidos** — cadastro, edição, listagem e remoção
- **Atividades** — cadastro, edição, listagem e remoção
- Alertas de sucesso/erro em todas as operações
- Interface responsiva (Bootstrap 5)

---

## Segurança

- Senhas armazenadas com **bcrypt** (salt rounds: 10)
- Proteção contra **SQL Injection** via queries parametrizadas (mysql2)
- Rotas protegidas por middleware de sessão
- Variáveis sensíveis via `.env` (nunca commitadas)

---

## Equipe

| Nome | Função | Contato |
|------|--------|---------|
| José Gabriel Santos Gomes | Desenvolvedor Fullstack | jose.8540691@edu.univali.br |
| Kaio Otavio de Oliveira Situlino | UI/UX Design e Front-end | kaio.7794665@edu.univali.br |
| Matheus Pompeo Dias | Desenvolvedor Fullstack | matheus.8541795@edu.univali.br |
| Nathan Reichert | Banco de Dados e Documentação | nathan.8533741@edu.univali.br |

**Orientador:** Prof. Dr. Jhonatan Alves — jhonatan.alves@univali.br

---

## Documentação

A pasta [`docs/`](./docs/) contém:

- `relatorio_de_extensao.pdf` — Relatório do projeto de extensão
- `carta_de_apresentacao_e_aceite.pdf` — Carta de aceite assinada pela AMA ONG
