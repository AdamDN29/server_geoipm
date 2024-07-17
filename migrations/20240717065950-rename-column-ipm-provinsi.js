'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('IPM_Provinsis', 'gwr', 'mgwr');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('IPM_Provinsis', 'mgwr', 'gwr');
  }
};
