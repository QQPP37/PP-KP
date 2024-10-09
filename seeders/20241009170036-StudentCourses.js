'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const studentCourses = require('../data/studentCourse.json').map((studentCourse) => {
    delete studentCourse.id;
    studentCourse.createdAt = new Date();
    studentCourse.updatedAt = new Date();
    return studentCourse;
  });

   await queryInterface.bulkInsert('StudentCourses', studentCourses, {});
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('StudentCourses', null, {});
    
  
  }
};
