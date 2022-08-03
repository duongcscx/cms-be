const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CollectionEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CollectionEntry.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      collection_type_id: {
        type: DataTypes.UUID,
        references: {
          model: 'CollectionTypes',
          key: 'id',
        },
      },
      isPublished: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'CollectionEntry',
      timestamps: false,
    }
  );
  return CollectionEntry;
};
