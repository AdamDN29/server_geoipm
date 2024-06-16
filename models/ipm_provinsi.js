'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IPM_Provinsi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IPM_Provinsi.belongsTo(models.Provinsi, {
        foreignKey: 'provinsi_Id',
        onDelete: 'CASCADE'
      })
    }
  }
  IPM_Provinsi.init({
    tahun: DataTypes.INTEGER,
    ipm: DataTypes.FLOAT,
    uhh: DataTypes.FLOAT,
    ahls: DataTypes.FLOAT,
    arls: DataTypes.FLOAT,
    ppd: DataTypes.INTEGER,
    iuhh: DataTypes.FLOAT,
    ipthn: DataTypes.FLOAT,
    iplrn: DataTypes.FLOAT,
    gwr: DataTypes.STRING,
    provinsi_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'IPM_Provinsi',
  });
  return IPM_Provinsi;
};