'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.User, { foreignKey: 'UserId' });
      Student.belongsToMany(models.Course, { through: models.StudentCourse });
  
    }
  }
  Student.init({
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
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Class is required'
        },
        notNull: {
          msg: 'Class is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'User is required'
        },
        notNull: {
          msg: 'User is required'
        }
      }
    }
  }, {
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};