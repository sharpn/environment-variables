import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection';
import { encryptFields, encryptFieldsBulk } from '../lib/encryption';

export interface IVariableVersion {
  id?: string;
  variable_id: string;
  value: string;
  salt?: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date;
}

export class VariableVersion
  extends Model<IVariableVersion, IVariableVersion>
  implements IVariableVersion {
  public id?: string;
  public variable_id: string;
  public value: string;
  public salt: string;

  public static readonly encyptedFields: string[] = ['value'];

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

VariableVersion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    variable_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'variables', key: 'id' },
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
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
    tableName: 'variable_versions',
    sequelize,
    paranoid: true,
  },
);

const beforeHook = encryptFields<VariableVersion>(
  VariableVersion.encyptedFields,
);

const bulkBeforeHook = encryptFieldsBulk<VariableVersion>(
  VariableVersion.encyptedFields,
);

VariableVersion.beforeBulkCreate(bulkBeforeHook);
VariableVersion.beforeCreate(beforeHook);
VariableVersion.beforeUpdate(beforeHook);
