'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      StudentCourse.belongsTo(models.Course, { foreignKey: 'CourseId'});
      StudentCourse.belongsTo(models.Student, { foreignKey: 'StudentId' });
     
    }
  }
  StudentCourse.init({
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Course is required'
        },
        notNull: {
          msg: 'Course is required'
        }
      }
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {   
        notEmpty: {
          msg: 'Student is required'
        },
        notNull: {
          msg: 'Student is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'StudentCourse',
  });
  return StudentCourse;
};