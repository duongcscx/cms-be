const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CollectionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CollectionType.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CollectionType',
      timestamps: false,
    }
  );
  return CollectionType;
};
