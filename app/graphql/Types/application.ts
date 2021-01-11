import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Application {
  @Field()
  id: string;

  @Field()
  name: string;
}
