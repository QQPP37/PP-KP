'use strict';

/** @type {import('sequelize-cli').Migration} */
const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    
const users = require('../data/user.json').map((user) => {
  delete user.id;
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.password = hashPassword(user.password);
  return user;
});

await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Users', null, {});
    
  }
};
