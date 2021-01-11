import { Model } from 'sequelize';
import { getSalt, processFieldEncryption } from './model-encryption';

export function encryptFields<TModel extends Model>(
  fields: string[],
  saltField: string = 'salt',
) {
  return async (model: TModel) => {
    const [salt, created] = getSalt(model[saltField]);
    for (const field of fields) {
      if (typeof model[field] === 'string') {
        model[field] = processFieldEncryption(model[field], salt);
      }
    }

    if (created) {
      model[saltField] = salt;
    }
  };
}

export function encryptFieldsBulk<TModel extends Model>(
  fields: string[],
  saltField: string = 'salt',
) {
  return async (models: TModel[]) => {
    for (const model of models) {
      encryptFields(fields, saltField)(model);
    }
  };
}
