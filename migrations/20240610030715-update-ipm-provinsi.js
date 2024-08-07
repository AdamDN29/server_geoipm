'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('IPM_Provinsis', 'gwr', {
        type: Sequelize.STRING
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn('IPM_Provinsis', 'gwr')]);
  }
};
