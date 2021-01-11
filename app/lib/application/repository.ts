import { Application, IApplication } from '../../orm/models/application';

export async function createApplication(name: string): Promise<IApplication> {
  return await Application.create({
    name,
  });
}

export async function getApplications(): Promise<IApplication[]> {
  return await Application.findAll();
}
