import { getDecryptedVersion } from '../../orm/lib/model-encryption';
import { IVariable, Variable } from '../../orm/models/variable';
import {
  IVariableVersion,
  VariableVersion,
} from '../../orm/models/variable_version';
import {
  createVariable as repositoryCreateVariable,
  getVariable as repositoryGetVariable,
  getVariables as repositoryGetVariables,
  getLatestVariableValue as repositoryGetLatestVariableValue,
  addNewVariableValue as repositoryAddNewVariableValue,
  variableBelongsToApplication,
} from './repository';

export async function createVariable(
  app_id: string,
  key: string,
  value: string,
) {
  const variable = await repositoryCreateVariable(app_id, key, value);
  return variable.id;
}

export async function getVariable(app_id: string, variable_id: string) {
  const variable = await repositoryGetVariable(app_id, variable_id);
  const mappedVariable = await mapVariable(variable);
  return mappedVariable;
}

export async function getVariables(app_id: string) {
  const variables = await repositoryGetVariables(app_id);
  return await Promise.all(variables.map(mapVariable));
}

export async function getLatestVariableValue(variable_id: string) {
  const variable = await repositoryGetLatestVariableValue(variable_id);
  return await mapVariableVersion(variable);
}

export async function addNewVariableValue(
  app_id: string,
  variable_id: string,
  value: string,
) {
  const variableExistsOnApp = await variableBelongsToApplication(
    app_id,
    variable_id,
  );

  if (!variableExistsOnApp) {
    throw new Error('App does not contain given variable');
  }

  await repositoryAddNewVariableValue(variable_id, value);
}

async function mapVariable(variable: IVariable) {
  return {
    id: variable.id,
    key: variable.key,
  };
}

async function mapVariableVersion(variableVersion: IVariableVersion) {
  if (!variableVersion) return null;

  const mappedBock = {
    id: variableVersion.id,
    value: variableVersion.value,
  };

  const decrypted = getDecryptedVersion(
    mappedBock,
    VariableVersion.encyptedFields,
    variableVersion.salt,
  );

  return decrypted;
}
