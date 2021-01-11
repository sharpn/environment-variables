import { DataTypes, Model, Association } from 'sequelize';
import { sequelize } from '../connection';

// JOINS
import { VariableVersion, IVariableVersion } from './variable_version';

export interface IVariable {
  id?: string;
  app_id: string;
  key: string;

  readonly versions?: IVariableVersion[];

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date;
}

export class Variable extends Model<IVariable, IVariable> implements IVariable {
  public id?: string;
  public app_id: string;
  public key: string;

  public readonly versions?: IVariableVersion[];

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;

  public static associations: {
    versions: Association<Variable, VariableVersion>;
  };
}

Variable.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    app_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'applications', key: 'id' },
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'variables',
    sequelize,
    paranoid: true,
  },
);

Variable.hasMany(VariableVersion, {
  foreignKey: 'variable_id',
  as: 'versions',
});
