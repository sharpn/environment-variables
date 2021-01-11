import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { json } from 'body-parser';
import 'reflect-metadata';

import { graphqlHTTP } from 'express-graphql';

import { schema } from './graphql/_queries';
import { GraphQLSchema } from 'graphql';
import { ValidationError } from 'class-validator';

const PORT = parseInt(process.env.PORT) || 9000;

const server = new ApolloServer({ schema, playground: true });
export const app = express();

app.use(json());

require('require-all')(__dirname + '/controllers');

server.applyMiddleware({ app });

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(500).json(err);
  }

  res.status(500).json(err);
});

app.listen(PORT);
