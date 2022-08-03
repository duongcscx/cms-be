module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.createTable('TypeBuilders', {
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
      data_name: {
        type: Sequelize.STRING,
      },
      data_type: {
        type: Sequelize.ENUM,
        values: ['Text', 'Number', 'Time Date'],
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TypeBuilders');
  },
};
