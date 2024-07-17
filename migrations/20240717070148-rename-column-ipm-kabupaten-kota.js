'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('IPM_Kabupaten_Kota', 'gwr', 'mgwr');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('IPM_Kabupaten_Kota', 'mgwr', 'gwr');
  }
};
