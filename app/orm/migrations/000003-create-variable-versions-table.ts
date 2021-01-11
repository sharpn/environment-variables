const TABLE_NAME = 'variable_versions';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable(TABLE_NAME, {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    variable_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'variables', key: 'id' },
    },
    value: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  });
}

export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable(TABLE_NAME);
}
