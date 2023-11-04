var express = require('express');

const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

const knex = require('knex');
const db = knex(require('./knexfile')['development']);

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      details: { type: GraphQLString },
      status: { type: GraphQLInt },
      user_id: { type: GraphQLInt },
    },
  });
  
  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      obs: { type: GraphQLString },
    },
  });
  
  const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      tasks: {
        type: new GraphQLList(TaskType),
        resolve: async () => {
          return db.select().from('tasks');
        },
      },
      taskById: {
        type: TaskType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve: async (_, args) => {
          return db('tasks').where('id', args.id).first();
        },
      },
      taskByStatus: {
        type: new GraphQLList(TaskType),
        args: {
          status: { type: GraphQLInt },
        },
        resolve: async (_, args) => {
          return db('tasks').where('status', args.status);
        },
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: async () => {
          return db.select().from('users');
        },
      },
    },
  });
  
  const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: {
        type: UserType,
        args: {
          name: { type: GraphQLString },
          obs: { type: GraphQLString },
        },
        resolve: async (_, args) => {
          const [newUserId] = await db('users').insert(args);
          return db('users').where('id', newUserId).first();
        },
      },
      createTask: {
        type: TaskType,
        args: {
          name: { type: GraphQLString },
          details: { type: GraphQLString },
          status: { type: GraphQLInt },
          user_id: { type: GraphQLInt },
        },
        resolve: async (_, args) => {
          const [newTaskId] = await db('tasks').insert(args);
          return db('tasks').where('id', newTaskId).first();
        },
      },

      updateTask: {
        type: TaskType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) }, // Torna o ID obrigatório
          name: { type: GraphQLString },
          details: { type: GraphQLString },
          status: { type: GraphQLInt },
          user_id: { type: GraphQLInt },
        },
        resolve: async (_, args) => {
          await db('tasks').where('id', args.id).update(args);
          return db('tasks').where('id', args.id).first();
        },
      },
      deleteTask: {
        type: TaskType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) }, // Torna o ID obrigatório
        },
        resolve: async (_, args) => {
          const deletedTask = await db('tasks').where('id', args.id).first();
          await db('tasks').where('id', args.id).del();
          return deletedTask;
        },
      },
    },
  });

  const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType, // Adicione as mutações ao esquema
  });

var app = express();

app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  );

  module.exports = app;