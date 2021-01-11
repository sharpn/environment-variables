import { DataTypes, Model, Association } from 'sequelize';
import { sequelize } from '../connection';

// JOINS
import { Variable } from './variable';

export interface IApplication {
  id?: string;
  name: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date;
}

export class Application
  extends Model<IApplication, IApplication>
  implements IApplication {
  public id?: string;
  public name: string;

  public static associations: {
    variables: Association<Application, Variable>;
  };

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

Application.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
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
    tableName: 'applications',
    sequelize,
    paranoid: true,
  },
);

Application.hasMany(Variable, {
  foreignKey: 'app_id',
  as: 'variables',
});
