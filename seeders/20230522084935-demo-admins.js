'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      {
        nama: 'Admin4523',
        username: 'admin4523',
        password: 'adminGeoIPM4523',
        email: 'geoipm4523@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
