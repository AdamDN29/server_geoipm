const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.Provinsi.findAll(
      {
        attributes:['id', ['nama_provinsi','nama_wilayah'],'latitude','longitude'],
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
          attributes:['id', ['nama_provinsi','nama_wilayah'],'latitude','longitude']
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

  module.exports.createProvinsi = async function (req, res) {
    console.log('hit');
    const {
      nama_wilayah,
      latitude,
      longitude,
    } = req.body;
  
    const lastData = await db.Provinsi.findOne({ order: [ [ 'id', 'DESC' ]] })
    const id = lastData.id + 1;
    
    const nama_provinsi = nama_wilayah;

    const createData = {
      id,
      nama_provinsi,
      latitude,
      longitude,
    };
  
    try {
      // check if name exist
      const existData = await db.Provinsi.findOne({ where: { nama_provinsi } })
      if (existData) {
        return res.status(409).json({
          success: false,
          flag: true,
          message: "Wilayah dengan nama tersebut sudah ada!"
        });
      };
  
      const createdData = await db.Provinsi.create(createData);
  
      return res.status(200).json({
        success: true,
        data: createdData,
        message: "Data Wilayah Berhasil Ditambah!"
      });
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
        message: error.message
      });
    }
  }
  
  module.exports.deleteDataById = async function (req, res) {
    try {
      const { id } = req.params;

      await db.IPM_Provinsi.destroy({where: { provinsi_Id: id } })

      const deletedData = await db.Provinsi.findByPk(id);
  
      if (!deletedData) {
        return res.status(404).json({
          sucess: false,
          flag: true,
          message: 'Data Tidak Ditemukan!'
        });
      }
  
      await deletedData.destroy();
  
      return res.status(200).json({
        success: true,
        data: deletedData,
        message: 'Data Berhasil Dihapus'
      });
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
        message: error.message
      });
    }
  }
  