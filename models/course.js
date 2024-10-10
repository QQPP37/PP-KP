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
      Course.belongsTo(models.Category, { foreignKey: 'CategoryId' });
      Course.belongsToMany(models.Student, { through: models.StudentCourse });
    }
    get showDuration() {
      if (this.duration < 60) {
          return `${this.duration} minutes`;
      } else {
          const hours = Math.floor(this.duration / 60);
          const minutes = this.duration % 60;
          return minutes > 0 ? `${hours} hours and ${minutes} minutes` : `${hours} hours`;
      }
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        },
        notNull: {
          msg: 'Description is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};