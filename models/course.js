'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Course.belongsToMany(models.Student, { through: models.StudentCourse });
    }
  }
  Course.init({
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
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Duration is required'
        },
        notNull: {
          msg: 'Duration is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};