module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.createTable('CollectionEntries', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
      },
      collection_type_id: {
        type: Sequelize.UUID,
        references: {
          model: 'CollectionTypes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CollectionEntries');
  },
};
