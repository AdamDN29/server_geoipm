'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Provinsis', 'geojson');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Provinsis', 'geojson', {
      type: Sequelize.TEXT
    });
  }
};
