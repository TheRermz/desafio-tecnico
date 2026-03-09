# Order Management API

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Endpoints da API](#endpoints-da-api)
- [Exemplos de Requisições](#exemplos-de-requisições)
- [Schema do Banco de Dados](#schema-do-banco-de-dados)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Scripts Disponíveis](#scripts-disponíveis)

## Visão Geral

Esta API foi desenvolvida em Node.js com NestJS para gerenciar produtos e pedidos. A aplicação implementa operações CRUD completas, validação robusta de dados, mapeamento de campos de português para inglês, e soft delete para manter histórico de registros.

### Principais Características

- **Validação de Dados**: Validação completa usando class-validator
- **Mapeamento de Campos**: API aceita campos em português e mapeia para inglês internamente
- **Soft Delete**: Exclusões lógicas mantendo histórico de dados
- **IDs Personalizados**: Geração automática de IDs com formato específico
- **Cálculo Automático**: Valor total do pedido calculado automaticamente
- **Relacionamentos em Cascata**: Operações em ordem refletem automaticamente nos itens

## Tecnologias

### Backend

- **NestJS** 11.0.1 - Framework Node.js progressivo
- **TypeScript** 5.7.3 - Superset tipado do JavaScript
- **Node.js** - Runtime JavaScript

### Banco de Dados

- **PostgreSQL** 14 - Banco de dados relacional
- **TypeORM** 0.3.28 - ORM para TypeScript/JavaScript

### Principais Dependências

- **class-validator** 0.14.4 - Validação de DTOs
- **class-transformer** 0.5.1 - Transformação de objetos
- **uuid** 13.0.0 - Geração de identificadores únicos
- **pg** 8.20.0 - Driver PostgreSQL

### Ferramentas de Desenvolvimento

- **Jest** 30.0.0 - Framework de testes
- **ESLint** 9.18.0 - Linter
- **Prettier** 3.4.2 - Formatador de código

## Estrutura do Projeto

```
desafio-tecnico/
├── api/
│   ├── src/
│   │   ├── main.ts                    # Entry point da aplicação
│   │   ├── app.module.ts              # Módulo raiz com config do DB
│   │   └── order/
│   │       ├── controllers/
│   │       │   ├── order.controller.ts      # Endpoints de pedidos
│   │       │   └── product.controller.ts    # Endpoints de produtos
│   │       ├── dto/
│   │       │   ├── order/                   # DTOs de pedidos (PT/EN)
│   │       │   ├── product/                 # DTOs de produtos (PT/EN)
│   │       │   └── items/                   # DTOs de itens (PT/EN)
│   │       ├── entities/
│   │       │   ├── order.entity.ts          # Entidade Order
│   │       │   ├── product.entity.ts        # Entidade Product
│   │       │   └── items.entity.ts          # Entidade Items
│   │       ├── services/
│   │       │   ├── order.service.ts         # Lógica de negócio de pedidos
│   │       │   ├── product.service.ts       # Lógica de negócio de produtos
│   │       │   ├── orderMapper.service.ts   # Mapeamento PT→EN (pedidos)
│   │       │   └── productMapper.service.ts # Mapeamento PT→EN (produtos)
│   │       ├── repositories/
│   │       │   ├── order.repository.ts      # Repository de pedidos
│   │       │   └── product.repository.ts    # Repository de produtos
│   │       ├── Interfaces/
│   │       │   ├── orderInput.interface.ts  # Interfaces de pedidos
│   │       │   └── productInput.interface.ts# Interfaces de produtos
│   │       └── order.module.ts              # Módulo de pedidos
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
├── docker-compose.yml                 # Configuração Docker do PostgreSQL
└── README.md                          # Este arquivo
```

## Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**

```bash
git clone git@github.com:TheRermz/desafio-tecnico.git
cd desafio-tecnico
```

2. **Instale as dependências**

```bash
cd api
npm install
```

3. **Inicie o banco de dados PostgreSQL**

```bash
docker-compose up -d
```

## Configuração

### Banco de Dados

A configuração do banco de dados está em `api/src/app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "orders",
  autoLoadEntities: true,
  synchronize: true, // Apenas em desenvolvimento
});
```

## Executando a Aplicação

### Modo Desenvolvimento

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

### Modo Produção

```bash
npm run build
npm run start:prod
```

### Modo Debug

```bash
npm run start:debug
```

## Endpoints da API

### Produtos

| Método | Endpoint          | Descrição                     |
| ------ | ----------------- | ----------------------------- |
| POST   | `/product`        | Criar novo produto            |
| GET    | `/product`        | Listar todos os produtos      |
| GET    | `/product/active` | Listar apenas produtos ativos |
| GET    | `/product/:id`    | Buscar produto por ID         |
| PATCH  | `/product/:id`    | Atualizar produto             |
| DELETE | `/product/:id`    | Deletar produto (soft delete) |

### Pedidos

| Método | Endpoint        | Descrição                    |
| ------ | --------------- | ---------------------------- |
| POST   | `/order`        | Criar novo pedido            |
| GET    | `/order`        | Listar todos os pedidos      |
| GET    | `/order/active` | Listar apenas pedidos ativos |
| GET    | `/order/:id`    | Buscar pedido por ID         |
| PATCH  | `/order/:id`    | Atualizar pedido             |
| DELETE | `/order/:id`    | Deletar pedido (soft delete) |

## Exemplos de Requisições

### Criar Produto

**Request:**

```bash
curl --location 'http://localhost:3000/product' \
--header 'Content-Type: application/json' \
--data '{
  "nomeProduto": "Notebook Dell Inspiron",
  "valorItem": 3500.99
}'
```

**Response:**

```json
{
  "productId": "p1a2b3c4dvdb",
  "productName": "Notebook Dell Inspiron",
  "price": 3500.99,
  "isActive": true
}
```

### Criar Pedido

**Request:**

```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
  "items": [
    {
      "idItem": "p1a2b3c4dvdb",
      "quantidadeItem": 2
    }
  ]
}'
```

**Response:**

```json
{
  "orderId": "v5d6e7f8gvdb",
  "value": 7001.98,
  "createdAt": "2024-03-09T10:30:00.000Z",
  "isActive": true,
  "items": [
    {
      "orderId": "v5d6e7f8gvdb",
      "productId": "p1a2b3c4dvdb",
      "quantity": 2,
      "price": 7001.98
    }
  ]
}
```

### Buscar Pedido por ID

**Request:**

```bash
curl --location 'http://localhost:3000/order/v5d6e7f8gvdb'
```

**Response:**

```json
{
  "orderId": "v5d6e7f8gvdb",
  "value": 7001.98,
  "createdAt": "2024-03-09T10:30:00.000Z",
  "isActive": true,
  "items": [
    {
      "orderId": "v5d6e7f8gvdb",
      "productId": "p1a2b3c4dvdb",
      "quantity": 2,
      "price": 7001.98
    }
  ]
}
```

### Atualizar Produto

**Request:**

```bash
curl --location --request PATCH 'http://localhost:3000/product/p1a2b3c4dvdb' \
--header 'Content-Type: application/json' \
--data '{
  "nomeProduto": "Notebook Dell XPS",
  "valorItem": 4200.00
}'
```

### Atualizar Pedido

**Request:**

```bash
curl --location --request PATCH 'http://localhost:3000/order/v5d6e7f8gvdb' \
--header 'Content-Type: application/json' \
--data '{
  "items": [
    {
      "idItem": "p1a2b3c4dvdb",
      "quantidadeItem": 3
    }
  ]
}'
```

### Deletar Produto (Soft Delete)

**Request:**

```bash
curl --location --request DELETE 'http://localhost:3000/product/p1a2b3c4dvdb'
```

**Response:**

```json
{
  "productId": "p1a2b3c4dvdb",
  "productName": "Notebook Dell XPS",
  "price": 4200.0,
  "isActive": false
}
```

## Schema do Banco de Dados

### Tabela: product

| Coluna      | Tipo          | Descrição                           |
| ----------- | ------------- | ----------------------------------- |
| productId   | VARCHAR (PK)  | ID único (formato: `p{8-chars}vdb`) |
| productName | VARCHAR       | Nome do produto                     |
| price       | DECIMAL(10,2) | Preço do produto                    |
| isActive    | BOOLEAN       | Flag de soft delete (padrão: true)  |

### Tabela: order

| Coluna    | Tipo          | Descrição                           |
| --------- | ------------- | ----------------------------------- |
| orderId   | VARCHAR (PK)  | ID único (formato: `v{8-chars}vdb`) |
| value     | DECIMAL(10,2) | Valor total do pedido               |
| createdAt | TIMESTAMP     | Data de criação (auto-gerado)       |
| isActive  | BOOLEAN       | Flag de soft delete (padrão: true)  |

### Tabela: items

| Coluna    | Tipo             | Descrição                                |
| --------- | ---------------- | ---------------------------------------- |
| orderId   | VARCHAR (PK, FK) | Referência ao pedido                     |
| productId | VARCHAR (PK, FK) | Referência ao produto                    |
| quantity  | INTEGER          | Quantidade do produto                    |
| price     | DECIMAL(10,2)    | Preço total do item (preço × quantidade) |

### Relacionamentos

```
Order (1) ──── (N) Items (N) ──── (1) Product
```

- **Order → Items**: One-to-Many com cascade
- **Product → Items**: One-to-Many
- **Items → Order**: Many-to-One
- **Items → Product**: Many-to-One

## Funcionalidades Implementadas

### 1. Validação de Dados

Validação completa usando decoradores do class-validator:

```typescript
@IsString({ message: 'O id do produto deve ser uma string' })
@IsNotEmpty({ message: 'O id do produto não deve ser nulo' })
idItem: string;

@IsNumber({}, { message: 'A quantidade deve ser um número' })
@IsPositive({ message: 'A quantidade deve ser positiva' })
quantidadeItem: number;
```

Mensagens de erro em português para melhor UX.

### 2. Mapeamento de Campos (Português → Inglês)

A API aceita campos em **português** e mapeia internamente para **inglês**:

**Mapper Services:**

- `OrderMapperService`: Mapeia dados de pedidos
- `ProductMapperService`: Mapeia dados de produtos

**Mapeamento de Campos:**

| Português (API) | Inglês (Banco) |
| --------------- | -------------- |
| nomeProduto     | productName    |
| valorItem       | price          |
| numeroPedido    | orderId        |
| valorTotal      | value          |
| dataCriacao     | createdAt      |
| estaAtivo       | isActive       |
| idItem          | productId      |
| quantidadeItem  | quantity       |

### 3. Soft Delete

Exclusões lógicas preservando histórico:

- DELETE endpoints definem `isActive = false`
- Registros permanecem no banco de dados
- Endpoints `/active` retornam apenas registros ativos
- Endpoints padrão retornam todos os registros

### 4. Geração Automática de IDs

IDs gerados automaticamente com formato específico:

- **Produtos**: `p{8-chars-uuid}vdb` (exemplo: `p1a2b3c4dvdb`)
- **Pedidos**: `v{8-chars-uuid}vdb` (exemplo: `v5d6e7f8gvdb`)

Implementado via hooks `@BeforeInsert()` nas entidades.

### 5. Cálculo Automático de Valores

O valor total do pedido é calculado automaticamente:

1. Busca o preço atual de cada produto
2. Multiplica pelo quantidade
3. Soma todos os itens
4. Valida se produtos existem antes de criar o pedido

### 6. Repository Pattern

Separação clara de responsabilidades:

- **Controllers**: Recebem requisições HTTP
- **Services**: Contêm lógica de negócio
- **Repositories**: Centralizam operações de banco de dados
- **Entities**: Representam tabelas do banco
- **DTOs**: Validam e tipam dados de entrada/saída

### 7. Operações em Cascata

Relacionamento Order → Items com cascade habilitado:

- Criar/atualizar pedido automaticamente gerencia itens
- Deletar pedido remove itens relacionados

### 8. Tratamento de Erros

- `NotFoundException`: Produto/pedido não encontrado
- Validação automática de DTOs
- Mensagens de erro descritivas em português

## Scripts Disponíveis

### Desenvolvimento

```bash
npm run start:dev      # Inicia em modo watch (desenvolvimento)
npm run start:debug    # Inicia em modo debug
```

### Produção

```bash
npm run build          # Compila o projeto
npm run start:prod     # Inicia versão compilada
```

### Testes

```bash
npm run test           # Executa testes unitários
npm run test:watch     # Executa testes em modo watch
npm run test:cov       # Executa testes com cobertura
npm run test:e2e       # Executa testes end-to-end
```

### Qualidade de Código

```bash
npm run lint           # Executa ESLint com auto-fix
npm run format         # Formata código com Prettier
```
