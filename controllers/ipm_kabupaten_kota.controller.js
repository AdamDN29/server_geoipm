const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.IPM_Kabupaten_Kota.findAll();

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

module.exports.getAllDataKabKot = async function (req, res) {
  try {
    const year = req.params.year;

    let dataIPM;
    
    if (year !== "all"){
      dataIPM = await db.IPM_Kabupaten_Kota.findAll({
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'gwr', 'kabupaten_kota_Id'],
        where: {tahun: year},
        include: [
          {
            model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', attributes: ['id','nama_kabupaten_kota']
          }
        ],
        group: ['Kabupaten_Kotum.id', 'IPM_Kabupaten_Kota.kabupaten_kota_Id','IPM_Kabupaten_Kota.id'],
        order: [['tahun', 'DESC'],['id', 'ASC']]
      })
    }else{
      dataIPM = await db.IPM_Kabupaten_Kota.findAll({
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'gwr','kabupaten_kota_Id'],
        include: [
          {
            model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', attributes: ['id','nama_kabupaten_kota']
          }
        ],
        group: ['Kabupaten_Kotum.id', 'IPM_Kabupaten_Kota.kabupaten_kota_Id','IPM_Kabupaten_Kota.id'],
        order: [['tahun', 'DESC'],['id', 'ASC']]
      })
    }

    return res.status(200).json({
      sucess: true,
      data: dataIPM
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getOneDataKabKot = async function (req, res) {
  try {
    const id_kabkot = req.params.id;
    const year = req.params.year;

    let dataIPM;
    
    if (year !== "all"){
      dataIPM = await db.IPM_Kabupaten_Kota.findAll({
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'gwr','kabupaten_kota_Id'],
        where: {kabupaten_kota_Id: id_kabkot, tahun: year},
        include: [
          {
            model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', attributes: ['id','nama_kabupaten_kota']
          }
        ],
        group: ['Kabupaten_Kotum.id', 'IPM_Kabupaten_Kota.kabupaten_kota_Id','IPM_Kabupaten_Kota.id'],
        order: [['tahun', 'DESC']]
      })
    }else{
      dataIPM = await db.IPM_Kabupaten_Kota.findAll({
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'gwr','kabupaten_kota_Id'],
        where: {kabupaten_kota_Id: id_kabkot},
        include: [
          {
            model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', attributes: ['id','nama_kabupaten_kota']
          }
        ],
        group: ['Kabupaten_Kotum.id', 'IPM_Kabupaten_Kota.kabupaten_kota_Id','IPM_Kabupaten_Kota.id'],
        order: [['tahun', 'DESC']]
      })
    }

    return res.status(200).json({
      sucess: true,
      data: dataIPM
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getManyDataKabKot = async function (req, res) {
  try {
    const id_provinsi = req.params.id;
    const year = req.params.year;

    let dataIPM;

  if (year !== "all"){
    dataIPM = await db.IPM_Kabupaten_Kota.findAll({
      attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'gwr','kabupaten_kota_Id'],
      where: {tahun: year},
      include: [
        {
          model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', 
          attributes: ['id','nama_kabupaten_kota', 'provinsi_Id'],
          where: {provinsi_Id: id_provinsi}
        }
      ],
      group: ['Kabupaten_Kotum.id', 'IPM_Kabupaten_Kota.kabupaten_kota_Id','IPM_Kabupaten_Kota.id'],
      order: [['tahun', 'DESC'],['id', 'ASC']],
    })
  }else{
    dataIPM = await db.IPM_Kabupaten_Kota.findAll({
      attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'gwr','kabupaten_kota_Id'],
      include: [
        {
          model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', 
          attributes: ['id','nama_kabupaten_kota', 'provinsi_Id'],
          where: {provinsi_Id: id_provinsi}
        }
      ],
      group: ['Kabupaten_Kotum.id', 'IPM_Kabupaten_Kota.kabupaten_kota_Id','IPM_Kabupaten_Kota.id'],
      order: [['tahun', 'DESC'],['id', 'ASC']],
    })
  }

    return res.status(200).json({
      sucess: true,
      data: dataIPM
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getDataKabKot = async function (req, res) {
  try {
    const dataType = req.params.dataType;
    const year = req.params.year;

    const query = "IPM_Kabupaten_Kota." + dataType 

    const dataIPM = await db.IPM_Kabupaten_Kota.findAll({
      attributes: [[dataType, 'value'], 'kabupaten_kota_Id'],
      where: {tahun: year},
      include: [
        {
          model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', attributes: ['id','nama_kabupaten_kota','latitude','longitude','provinsi_Id']
        }
      ],
      group: ['Kabupaten_Kotum.id', 'IPM_Kabupaten_Kota.kabupaten_kota_Id', query],
      order: [['kabupaten_kota_Id', 'ASC']]
    })

    return res.status(200).json({
      sucess: true,
      dataValue: dataType,
      data: dataIPM
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getYearData = async function (req, res) {
  try {
    const dataYear = await db.IPM_Kabupaten_Kota.findAll({
      attributes:['tahun'],
      order:[['tahun', 'ASC']]
    });

    let arrayYear=[dataYear[0]];
    dataYear.forEach(item => {
      let temp = null;
      temp = arrayYear.find(element => {
        return element.tahun === item.tahun;
      })
      if (temp === undefined){
          arrayYear.push(item);
      }
    });

    return res.status(200).json({
      sucess: true,
      data: arrayYear,
      tingkat: "Kabupaten_Kota"
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getIPM_Kabupaten_KotaById = async function (req, res) {
    const id = req.params.id;
    try {
      const allData = await db.IPM_Kabupaten_Kota.findByPk(id,{
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'gwr','kabupaten_kota_Id'],
        include: [
          {
            model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', attributes: ['id','nama_kabupaten_kota']
          }
        ],
      });
  
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

  module.exports.getLastDataIPM = async function (req, res) {
    try {
      const lastData = await db.IPM_Kabupaten_Kota.findOne({
        order: [ [ 'id', 'DESC' ]] ,
        attributes: ['id', 'tahun', 'kabupaten_kota_Id']  
      });
  
      // const lastData = await db.IPM_Provinsi.findOne({ order: [ [ 'createdAt', 'DESC' ]] })
  
      return res.status(200).json({
        sucess: true,
        data: lastData
      });
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        error: error,
        message: error.message
      })
    }
  }

  module.exports.updateDataIPM = async function (req, res) {
    try {
      const { id } = req.params;
      const {
        uhh,
        ahls,
        arls,
        ppd,
        iuhh,
        ipthn,
        iplrn,
        ipm,
        gwr
      } = req.body;
  
      const editData = {
        uhh,
        ahls,
        arls,
        ppd,
        iuhh,
        ipthn,
        iplrn,
        ipm,
        gwr
      }
  
      const editedData = await db.IPM_Kabupaten_Kota.findByPk(id);
  
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

  module.exports.createDataIPM = async function (req, res) {
    const { kabupaten_kota_Id } = req.params;

    console.log('hit');
    const {
      idtemp,
      tahun,
      uhh,
      ahls,
      arls,
      ppd,
      iuhh,
      ipthn,
      iplrn,
      ipm,
      gwr
    } = req.body;

    const lastData = await db.IPM_Kabupaten_Kota.findOne({ order: [ [ 'id', 'DESC' ]] })
    const lastID = lastData.id + 1;

    let id;
    if (idtemp === "0"){
      id = lastID;
    } else{
      id = idtemp;
    }
  
    // const lastData = await db.IPM_Kabupaten_Kota.findOne({ order: [ [ 'createdAt', 'DESC' ]] })
    // console.log(lastData)
  
    // let id = lastData.id + 1;
    const createData = {
      id,
      tahun,
      uhh,
      ahls,
      arls,
      ppd,
      iuhh,
      ipthn,
      iplrn,
      ipm,
      gwr,
      kabupaten_kota_Id
    };
  
    try {
      // check if name exist
      const existData = await db.IPM_Kabupaten_Kota.findOne({ where: { kabupaten_kota_Id, tahun } })
      if (existData) {
        return res.status(409).json({
          success: false,
          flag: true,
          message: "Data IPM Kabupaten/Kota pada Tahun tersebut sudah ada!"
        });
      };
  
      const createdData = await db.IPM_Kabupaten_Kota.create(createData);
  
      return res.status(200).json({
        success: true,
        data: createdData,
        message: "Data IPM Kabupaten/Kota Berhasil Ditambah!"
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
  
      const deletedData = await db.IPM_Kabupaten_Kota.findByPk(id);
  
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