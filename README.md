# API GraphQL de Gerenciamento de Tarefas

O objetivo deste trabalho prático é criar uma API GraphQL que forneça acesso a dados de uma aplicação fictícia. A API deve ser capaz de realizar consultas e mutações em uma aplicação de gerenciamento de tarefas. Os usuários podem criar tarefas, marcar tarefas como concluídas, listar tarefas e obter detalhes específicos de uma tarefa.

## Requisitos

### Definição de Esquema

Crie um esquema GraphQL que defina os tipos de dados e operações suportadas pela API. Os principais tipos a serem considerados são Tarefa e Usuário.

### Consultas

Implemente consultas GraphQL para permitir que os clientes da API obtenham as seguintes informações:

- Lista de todas as tarefas.
- Detalhes de uma tarefa específica com base no seu ID.
- Lista de tarefas concluídas.
- Lista de tarefas pendentes.
- Lista de usuários.

### Mutações

Implemente mutações GraphQL para permitir que os clientes da API realizem as seguintes operações:

- Criar uma nova tarefa.
- Marcar uma tarefa como concluída.
- Atualizar informações de uma tarefa existente.
- Excluir uma tarefa.

## Executando o Projeto

## Clone o repositório publico:

```bash git clone https://github.com/wiusmarquespucmg/api_e_webservice_graphql```

## Instalação

Para instalar o módulo, execute os seguintes comandos:

```bash npm i```.

## Configuração do Banco de Dados

Certifique-se de que o banco de dados esteja configurado corretamente no arquivo ```knexfile.js```.

## Executar todas as migrations

```bash npx knex migrate:latest```

## Inicialização do servidor

Para inicializar o módulo, execute o seguinte comando:

```bash npm dev```

## Utilização

Para testar o módulo acessar a url:

```bash http://localhost:4000/graphql```

## Exemplos

### Status possíevis para as Tasks

- 0 - Não iniciada
- 1 - Concluídos
- 2 - Em andamento
- 3 - Atrasada
- 4 - Pendente


### Criação de novo usuário

``` 
    bash mutation {
        createUser(name: "Marcelo Ramos", obs: "Observações para o cadastro") {
            id
            name
            obs
      
        }
    }
```

### Criação de nova tarefa

``` 
    bash mutation {
        createTask(name: "Atividade de GraphiQL", details: "Descrição detalhada", status: 1, user_id: 1) {
            id
            name
            details
            status
            user_id
        }
    }
```

### Marcar uma tarefa como concluída

``` 
    bash mutation {
        updateTask(id: 10, status: 1) {
            id
            name
            details
            status
            user_id
        }
    }
```

### Excluir uma tarefa

``` 
    bash mutation {
        deleteTask(id: 10) {
            id
            name
            details
            status
            user_id
        }
    }
```

### Listar todas as tarefas

``` 
    bash query {
        tasks {
            id
            name
            details
            status
            user_id
        }
    }
```

### Buscar uma tarefa por ID

``` 
    bash query {
        taskById (id: 10) {
            id
            name
            details
            status
            user_id
        }
    }
```

### Buscar tarefas por status

``` 
    bash query {
        taskByStatus (status: 1) {
            id
            name
            details
            status
            user_id
        }
    }
```

### Buscar tarefas por status

``` 
    bash query {
        taskByStatus (status: 0) {
            id
            name
            details
            status
            user_id
        }
    }
```

### Buscar tarefas concluídas

``` 
    bash query {
        taskByStatus (status: 1) {
            id
            name
            details
            status
            user_id
        }
    }
```

### Buscar tarefas pendentes

``` 
    bash query {
        taskByStatus (status: 4) {
            id
            name
            details
            status
            user_id
        }
    }
```

## Lista de usuários

``` 
    bash query {
        users {
            id
            name
            obs
        }
    }
```

