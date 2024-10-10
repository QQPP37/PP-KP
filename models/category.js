'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Course, { foreignKey: 'CategoryId' });
    }
    static async showAll() {
      try {
        let data = await Category.findAll()
        return data
      } catch (error) {
        // console.log(error);
        throw error
      }
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        },
        notNull: {
          msg: 'Name is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};