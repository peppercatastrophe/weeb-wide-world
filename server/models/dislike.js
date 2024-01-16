'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
    }
  }
  Dislike.init({
    UserId: DataTypes.INTEGER,
    AnimeId: DataTypes.INTEGER,
    animeTitle: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Dislike',
  });
  return Dislike;
};