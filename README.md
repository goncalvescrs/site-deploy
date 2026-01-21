# Projeto Full-Stack com Next.js e PostgreSQL

Este projeto demonstra uma aplicação web full-stack construída com Next.js, utilizando um banco de dados PostgreSQL para persistência de dados. Ele é configurado para ser executado em um ambiente de desenvolvimento local com Docker, incluindo um sistema de migrações de banco de dados e testes de integração.

## Visão Geral

O objetivo deste projeto é servir como um guia prático para configurar um ambiente de desenvolvimento robusto, mostrando passo a passo como diferentes tecnologias se integram para criar uma aplicação funcional.

---

## Tecnologias Utilizadas

- **Frontend:** [Next.js](https://nextjs.org/) (com React)
- **Backend (API):** [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Orquestração de Serviços:** [Docker Compose](https://docs.docker.com/compose/)
- **Migrações de Banco de Dados:** [node-pg-migrate](https://github.com/salsita/node-pg-migrate)
- **Testes:** [Jest](https://jestjs.io/)

---

## Estrutura de Pastas

Aqui está uma visão geral das pastas e arquivos mais importantes do projeto:

```
/
├── infra/
│   ├── compose.yaml          # Define os serviços Docker (PostgreSQL)
│   ├── database.js           # Módulo de conexão com o banco de dados
│   └── migrations/           # Arquivos de migração do banco de dados
│   └── scripts/
│       └── wait-for-postgres.js # Script para aguardar o BD iniciar
│
├── pages/
│   ├── index.js              # Página inicial da aplicação (frontend)
│   └── api/
│       └── v1/
│           ├── status/       # Endpoint que verifica o status do BD
│           └── migrations/   # Endpoints para executar migrações via API
│
├── tests/
│   └── integration/          # Testes de integração para a API
│
├── .env.development          # Arquivo de variáveis de ambiente (local)
├── package.json              # Dependências e scripts do projeto
└── README.md                 # Este arquivo
```

---

## Passo a Passo: Executando o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente de desenvolvimento.

### Pré-requisitos

Antes de começar, você precisa ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/products/docker-desktop/)
- **Para usuários Windows:** [WSL (Windows Subsystem for Linux)](https://docs.microsoft.com/pt-br/windows/wsl/install)

### 1. Clone o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

### 2. Instale as Dependências

Este comando irá instalar todas as dependências listadas no `package.json`.

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Crie uma cópia do arquivo `.env.development` (se ele não existir) e preencha com as credenciais do seu banco de dados. Estas são as mesmas variáveis usadas pelo `docker-compose` para inicializar o contêiner do PostgreSQL.

**Arquivo: `.env.development`**

```env
# Configurações do PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=localuser
POSTGRES_PASSWORD=localpassword
POSTGRES_DB=localdb

# URL de conexão para as migrações e aplicação
DATABASE_URL="postgres://localuser:localpassword@localhost:5432/localdb?ssl=false"
```

### 4. Inicie a Aplicação Completa

O comando `dev` foi configurado para orquestrar todas as etapas necessárias para iniciar o ambiente de desenvolvimento.

```bash
npm run dev
```

Este comando executa a seguinte sequência de tarefas:

1.  **`services:up`**: Inicia o contêiner do PostgreSQL em segundo plano usando Docker Compose.
2.  **`wait-for-postgres`**: Executa um script que aguarda o banco de dados ficar pronto para aceitar conexões.
3.  **`migration:up`**: Aplica todas as migrações pendentes na pasta `infra/migrations`, garantindo que o schema do banco de dados esteja atualizado.
4.  **`next dev`**: Inicia o servidor de desenvolvimento do Next.js.

Após a execução, a aplicação estará disponível em `http://localhost:3000`.

---

## Scripts Disponíveis

- **`npm run dev`**: Inicia o ambiente completo de desenvolvimento.
- **`npm run services:up`**: Inicia apenas os serviços do Docker (banco de dados).
- **`npm run services:down`**: Para e remove os contêineres Docker.
- **`npm test`**: Executa os testes de integração. Este comando também sobe um ambiente limpo para garantir que os testes sejam consistentes.
- **`npm run migration:create -- <nome-da-migracao>`**: Cria um novo arquivo de migração.
- **`npm run migration:up`**: Aplica as migrações pendentes.

---

## Entendendo a API

### Endpoint de Status

Para verificar se a API está funcionando e conectada ao banco de dados, acesse o seguinte endpoint no seu navegador ou via `curl`:

**GET `/api/v1/status`**

- **URL:** `http://localhost:3000/api/v1/status`
- **Descrição:** Retorna informações sobre o estado do banco de dados, como a versão do PostgreSQL, o número máximo de conexões e o número de conexões ativas.
- **Exemplo de Resposta:**
  ```json
  {
    "updated_at": "2024-05-21T18:47:33.192Z",
    "dependencies": {
      "database": {
        "version": "16.1",
        "max_connections": 100,
        "opned_connections": 1
      }
    }
  }
  ```
  Este endpoint é um ótimo exemplo de como o Next.js pode servir tanto o frontend quanto o backend, acessando o banco de dados diretamente através de uma rota de API.
