# AMA Web System

Sistema web desenvolvido para a **Associação Palmira Gobbi Amigo dos Amigos (AMA ONG)** como projeto de extensão universitária, na disciplina de **Programação Web** — Ciência da Computação, Univali.

O sistema digitaliza os processos internos da ONG, aumenta sua visibilidade digital e facilita a comunicação com a comunidade atendida.

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5, CSS3, Bootstrap 5, JavaScript ES6+ |
| Backend | Node.js + Express |
| Banco de Dados | MySQL |
| Autenticação | JWT + express-session |
| Arquitetura | MVC (Model-View-Controller) |

---

## Estrutura do Projeto

```
ama-web-system/
├── docs/                          # Documentação institucional (relatório, carta de aceite)
├── public/
│   ├── css/                       # Estilos globais
│   ├── js/                        # Scripts do cliente
│   └── images/                    # Imagens e assets
├── src/
│   ├── config/
│   │   └── database.js            # Configuração do pool MySQL
│   ├── controllers/               # Lógica de negócio por módulo
│   ├── middlewares/
│   │   └── auth.js                # Verificação de JWT/sessão
│   ├── models/                    # Acesso ao banco de dados
│   ├── routes/                    # Definição das rotas Express
│   └── app.js                     # Ponto de entrada da aplicação
├── views/
│   ├── pages/                     # Páginas HTML
│   └── partials/                  # Componentes reutilizáveis (navbar, footer)
├── .env.example                   # Variáveis de ambiente necessárias
└── package.json
```

---

## Como Rodar Localmente

**Pré-requisitos:** Node.js 18+, MySQL 8+

```bash
# 1. Clone o repositório
git clone https://github.com/mapompeo/ama-web-system.git
cd ama-web-system

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# edite o .env com seus dados de banco e chaves secretas

# 4. Inicie o servidor
npm run dev     # desenvolvimento (nodemon)
npm start       # produção
```

O servidor estará disponível em `http://localhost:3000`.

---

## Segurança

- Autenticação via **JWT** com expiração de 8h
- Senhas armazenadas com **bcrypt** (salt rounds: 10)
- Proteção contra **SQL Injection** via queries parametrizadas (mysql2)
- Validação e sanitização de inputs no backend
- Comunicação via **HTTPS** em produção

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

- `relatorio_de_extensao.pdf` — Relatório do projeto de extensão (Univali)
- `carta_de_apresentacao_e_aceite.pdf` — Carta de aceite assinada pela AMA ONG

---

## Licença

MIT — livre para uso, modificação e distribuição.
