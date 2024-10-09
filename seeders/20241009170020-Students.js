'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  const students = require('../data/student.json').map((student) => {
    delete student.id;
    student.createdAt = new Date();
    student.updatedAt = new Date();
    return student;
  });

  await queryInterface.bulkInsert('Students', students, {});
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Students', null, {});
    
  
  }
};
