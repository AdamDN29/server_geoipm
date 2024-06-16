'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kabupaten_Kota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kabupaten_Kota.belongsTo(models.Provinsi, {
        foreignKey: 'provinsi_Id',
        onDelete: 'CASCADE'
      })
      Kabupaten_Kota.hasMany(models.IPM_Kabupaten_Kota, {
        foreignKey: 'kabupaten_kota_Id',
      })
    }
  }
  Kabupaten_Kota.init({
    nama_kabupaten_kota: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    geojson: DataTypes.TEXT,
    provinsi_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kabupaten_Kota',
  });
  return Kabupaten_Kota;
};