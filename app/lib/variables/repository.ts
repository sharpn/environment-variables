import { sequelize } from '../../orm/connection';

import { Variable, IVariable } from '../../orm/models/variable';
import {
  IVariableVersion,
  VariableVersion,
} from '../../orm/models/variable_version';

export async function createVariable(
  app_id: string,
  key: string,
  value: string,
): Promise<IVariable> {
  const transaction = await sequelize.transaction();

  try {
    const variable = await Variable.create(
      {
        app_id,
        key,
      },
      { transaction },
    );

    await VariableVersion.create(
      {
        variable_id: variable.id,
        value,
      },
      { transaction },
    );

    transaction.commit();

    return variable;
  } catch (err) {
    transaction.rollback();
    throw err;
  }
}

export async function getVariable(
  app_id: string,
  variable_id: string,
): Promise<IVariable> {
  return await Variable.findOne({
    where: {
      id: variable_id,
      app_id,
    },
    include: [
      {
        association: Variable.associations.versions,
        order: [['createdAt', 'DESC']],
      },
    ],
  });
}

export async function getLatestVariableValue(
  variable_id: string,
): Promise<IVariableVersion> {
  const version = await VariableVersion.findOne({
    where: {
      variable_id,
    },
    limit: 1,
    order: [['createdAt', 'DESC']],
  });

  return version;
}

export async function addNewVariableValue(variable_id: string, value: string) {
  await VariableVersion.create({
    variable_id,
    value,
  });
}

export async function getVariables(app_id: string): Promise<IVariable[]> {
  return await Variable.findAll({ where: { app_id } });
}

export async function variableBelongsToApplication(
  app_id: string,
  variable_id,
) {
  const variableCount = await Variable.count({
    where: {
      app_id,
      id: variable_id,
    },
  });

  return variableCount === 1;
}
