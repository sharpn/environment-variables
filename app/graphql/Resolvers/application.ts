import { Resolver, Query, ObjectType, Field, Arg } from 'type-graphql';

import { Application } from '../Types/application';
import { getApplications } from '../../lib/application/index';

@Resolver()
export class ApplicationResolver {
  @Query((returns) => [Application], { nullable: true })
  async applications(): Promise<Application[]> {
    return await getApplications();
  }

  @Query((_returns) => Application, { nullable: true })
  async application(@Arg('id') id: string): Promise<Application> {
    const applications = await getApplications();
    return applications[0];
  }
}
