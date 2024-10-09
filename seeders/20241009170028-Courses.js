'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const courses = require('../data/course.json').map((course) => {
      delete course.id;
      course.createdAt = new Date();
      course.updatedAt = new Date();
      return course;
    });

    await queryInterface.bulkInsert('Courses', courses, {});
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Courses', null, {});
    
  
  }
};
