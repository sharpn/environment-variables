const TABLE_NAME = 'applications';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable(TABLE_NAME, {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
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
