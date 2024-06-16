'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('IPM_Provinsis', 'gwr', {
        type: Sequelize.FLOAT
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn('IPM_Provinsis', 'gwr')]);
  }
};
