import { application } from 'express';
import { IApplication } from '../../orm/models/application';
import {
  createApplication as repositoryCreateApplication,
  getApplications as repositoryGetApplications,
} from './repository';

export async function createApplication(name: string) {
  const application = await repositoryCreateApplication(name);
  return application.id;
}

export async function getApplications() {
  const applications = await repositoryGetApplications();
  return Promise.all(applications.map(mapApplication));
}

async function mapApplication(application: IApplication) {
  return {
    id: application.id,
    name: application.name,
  };
}
