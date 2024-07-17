'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IPM_Kabupaten_Kota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IPM_Kabupaten_Kota.belongsTo(models.Kabupaten_Kota, { 
        foreignKey: 'kabupaten_kota_Id',
        onDelete: 'CASCADE'
      })
    }
  }
  IPM_Kabupaten_Kota.init({
    tahun: DataTypes.INTEGER,
    ipm: DataTypes.FLOAT,
    uhh: DataTypes.FLOAT,
    ahls: DataTypes.FLOAT,
    arls: DataTypes.FLOAT,
    ppd: DataTypes.INTEGER,
    iuhh: DataTypes.FLOAT,
    ipthn: DataTypes.FLOAT,
    iplrn: DataTypes.FLOAT,
    mgwr: DataTypes.STRING,
    kabupaten_kota_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'IPM_Kabupaten_Kota',
  });
  return IPM_Kabupaten_Kota;
};