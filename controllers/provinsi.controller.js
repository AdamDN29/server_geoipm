const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.Provinsi.findAll(
      {
        attributes:['id','nama_provinsi','latitude','longitude'],
        order: [['id', 'ASC']]
      }
    );

    return res.status(200).json({
      sucess: true,
      data: allData
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getProvinsiById = async function (req, res) {
    const id_provinsi = req.params.id;
    try {
      const data = await db.Provinsi.findByPk(id_provinsi,
        {
          attributes:['id','nama_provinsi','latitude','longitude']
        }
      );

      if (!data) {
        return res.status(404).json({
          success: false,
          flag: true,
          message: "Data Tidak Ditemukan!",
        });
      }
      return res.status(200).json({
        sucess: true,
        data: data
      });
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
        message: error.message
      })
    }
  }

  module.exports.updateProvinsi = async function (req, res) {
    try {
      const { id } = req.params;
      const {
        nama_wilayah,
        latitude,
        longitude
      } = req.body;
      
      const nama_provinsi = nama_wilayah;
      
      const editData = {
        nama_provinsi,
        latitude,
        longitude
      };
  
      const editedData = await db.Provinsi.findByPk(id);
  
      if (!editedData) {
        return res.status(404).json({
          sucess: false,
          flag: true,
          message: 'Data Tidak Ditemukan!'
        });
      }
  
      editedData.update(editData);
  
      return res.status(200).json({
        success: true,
        data: editedData,
        message: 'Data Berhasil Diubah'
      })
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
        message: error.message
      });
    }
  }

  