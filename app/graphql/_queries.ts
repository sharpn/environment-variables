import { buildSchemaSync } from 'type-graphql';
import { ApplicationResolver } from './Resolvers/application';

export const schema = buildSchemaSync({
  resolvers: [ApplicationResolver],
  emitSchemaFile: true,
  validate: false,
});
