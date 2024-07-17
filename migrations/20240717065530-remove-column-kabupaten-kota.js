'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Kabupaten_Kota', 'geojson');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Kabupaten_Kota', 'geojson', {
      type: Sequelize.TEXT
    });
  }
};
