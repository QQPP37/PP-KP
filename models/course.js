'use strict';
const { Model, Op } = require('sequelize');
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
          return `${this.duration} menit`;
      } else {
          const hours = Math.floor(this.duration / 60);
          const minutes = this.duration % 60;
          return minutes > 0 ? `${hours} jam dan ${minutes} menit` : `${hours} jam`;
      }
  }
  }
  Course.init({
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Nama diperlukan'
        },
        notNull: {
          msg: 'Nama diperlukan'
        }
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Durasi diperlukan'
        },
        notNull: {
          msg: 'Durasi diperlukan'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Deskripsi diperlukan'
        },
        notNull: {
          msg: 'Deskripsi diperlukan'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};