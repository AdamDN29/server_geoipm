'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('IPM_Provinsis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tahun: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ipm: {
        type: Sequelize.FLOAT
      },
      uhh: {
        type: Sequelize.FLOAT
      },
      ahls: {
        type: Sequelize.FLOAT
      },
      arls: {
        type: Sequelize.FLOAT
      },
      ppd: {
        type: Sequelize.INTEGER
      },
      iuhh: {
        type: Sequelize.FLOAT
      },
      ipthn: {
        type: Sequelize.FLOAT
      },
      iplrn: {
        type: Sequelize.FLOAT
      },
      gwr: {
        type: Sequelize.STRING
      },
      provinsi_Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Provinsis',
          key: 'id',
          as: 'provinsi_Id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('IPM_Provinsis');
  }
};