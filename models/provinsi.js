'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provinsi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Provinsi.hasMany(models.IPM_Provinsi, {
        foreignKey: 'provinsi_Id',
      })
      Provinsi.hasMany(models.Kabupaten_Kota, {
        foreignKey: 'provinsi_Id',
      })
    }
  }
  Provinsi.init({
    nama_provinsi: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    geojson: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Provinsi',
  });
  return Provinsi;
};