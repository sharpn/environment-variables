import { Sequelize } from 'sequelize';
import * as config from './config';

export const sequelize = new Sequelize(
  process.env[config.use_env_variable],
  config as any,
);
