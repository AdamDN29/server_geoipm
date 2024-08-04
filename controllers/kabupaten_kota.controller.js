const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.Kabupaten_Kota.findAll(
      {
        attributes:['id', ['nama_kabupaten_kota', 'nama_wilayah'],'latitude','longitude','provinsi_Id'],
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

module.exports.getKabKotbyProvinsi = async function (req, res) {
  try {
    const id_provinsi = req.params.id;

    const allData = await db.Kabupaten_Kota.findAll(
      {
        attributes:['id', ['nama_kabupaten_kota', 'nama_wilayah'],'provinsi_Id', "latitude", "longitude"],
        where: {provinsi_Id: id_provinsi},
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

module.exports.getKabupaten_KotaById = async function (req, res) {
    const id_kabkot = req.params.id;
    try {
      const data = await db.Kabupaten_Kota.findByPk(id_kabkot,
        {
          attributes:['id', ['nama_kabupaten_kota', 'nama_wilayah'],'latitude','longitude','provinsi_Id'],
          include: [
            {
              model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi']
            }
          ],
        }
      );
  
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

  module.exports.updateKabKot = async function (req, res) {
    try {
      const { id } = req.params;
      const {
        nama_wilayah,
        latitude,
        longitude
      } = req.body;
      
      const nama_kabupaten_kota = nama_wilayah;
      
      const editData = {
        nama_kabupaten_kota,
        latitude,
        longitude
      };
  
      const editedData = await db.Kabupaten_Kota.findByPk(id);
  
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

  module.exports.createKabKot = async function (req, res) {
    console.log('hit');
    const {
      nama_wilayah,
      latitude,
      longitude,
      provinsi_Id,
    } = req.body;
  
    const lastData = await db.Kabupaten_Kota.findOne({ order: [ [ 'id', 'DESC' ]] })
    const id = lastData.id + 1;

    const nama_kabupaten_kota = nama_wilayah;
  
    const createData = {
      id,
      nama_kabupaten_kota,
      latitude,
      longitude,
      provinsi_Id
    };
  
    try {
      // check if name exist
      const existData = await db.Kabupaten_Kota.findOne({ where: { nama_kabupaten_kota } })
      if (existData) {
        return res.status(409).json({
          success: false,
          flag: true,
          message: "Wilayah dengan nama tersebut sudah ada!"
        });
      };
  
      const createdData = await db.Kabupaten_Kota.create(createData);
  
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

      await db.IPM_Kabupaten_Kota.destroy({where: { kabupaten_kota_Id: id } })
  
      const deletedData = await db.Kabupaten_Kota.findByPk(id);
  
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