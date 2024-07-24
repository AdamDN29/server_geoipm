const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.IPM_Provinsi.findAll();

    return res.status(200).json({
      sucess: true,
      data: allData,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getAllDataProvinsi = async function (req, res) {
  try {
    const year = req.params.year;

    let dataIPM;
    
    if (year !== "all"){
      dataIPM = await db.IPM_Provinsi.findAll({
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'mgwr', 'provinsi_Id'],
        where: {tahun: year},
        include: [
          {
            model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi']
          }
        ],
        group: ['Provinsi.id', 'IPM_Provinsi.provinsi_Id','IPM_Provinsi.id'],
        order: [['tahun', 'DESC'],['id', 'ASC']]
      })
    }else{
      dataIPM = await db.IPM_Provinsi.findAll({
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'mgwr', 'provinsi_Id'],
        include: [
          {
            model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi']
          }
        ],
        group: ['Provinsi.id', 'IPM_Provinsi.provinsi_Id','IPM_Provinsi.id'],
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

module.exports.getOneDataProvinsi = async function (req, res) {
  try {
    const id_provinsi = req.params.id;
    const year = req.params.year;

    let dataIPM;
    if (year !== "all"){
      dataIPM = await db.IPM_Provinsi.findAll({
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'mgwr','provinsi_Id'],
        where: {provinsi_Id: id_provinsi, tahun: year},
        include: [
          {
            model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi']
          }
        ],
        group: ['Provinsi.id', 'IPM_Provinsi.provinsi_Id','IPM_Provinsi.id'],
        order: [['tahun', 'DESC']]
      })
    }else{
      dataIPM = await db.IPM_Provinsi.findAll({
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'mgwr','provinsi_Id'],
        where: {provinsi_Id: id_provinsi},
        include: [
          {
            model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi']
          }
        ],
        group: ['Provinsi.id', 'IPM_Provinsi.provinsi_Id','IPM_Provinsi.id'],
        order: [['tahun', 'DESC']]
      })
    }

    if(dataIPM.length === 0){
      return res.status(200).json({
        sucess: false,
        message: "Data Tidak Ditemukan"
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

module.exports.getDataProvinsi = async function (req, res) {
  try {
    const dataType = req.params.dataType;
    const year = req.params.year;

    const query = "IPM_Provinsi." + dataType 

    const dataIPM = await db.IPM_Provinsi.findAll({
      attributes: [[dataType, 'value'], 'provinsi_Id'],
      where: {tahun: year},
      include: [
        {
          model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi', 'latitude','longitude']
        }
      ],
      group: ['Provinsi.id', 'IPM_Provinsi.provinsi_Id', query],
      order: [['provinsi_Id', 'ASC']]
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
    const dataYear = await db.IPM_Provinsi.findAll({
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
      tingkat: "Provinsi"
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}


module.exports.getIPMProvinsiById = async function (req, res) {
    const id = req.params.id;
    try {
      const allData = await db.IPM_Provinsi.findByPk(id, {
        attributes: ['id', 'tahun', 'uhh', 'ahls', 'arls', 'ppd', 'iuhh', 'ipthn', 'iplrn', 'ipm', 'mgwr','provinsi_Id'],
        include: [
          {
            model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi']
          }
        ],
      });

      if(allData.length === 0){
        return res.status(400).json({
          sucess: false,
          message: "Data Tidak Ditemukan"
        })
      }else{
        return res.status(200).json({
          sucess: true,
          data: allData,
          temp: allData.length
        });
      }    
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
    const lastData = await db.IPM_Provinsi.findOne({
      order: [ [ 'id', 'DESC' ]] ,
      attributes: ['id', 'tahun', 'provinsi_Id']  
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
      mgwr
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
      mgwr
    }

    const editedData = await db.IPM_Provinsi.findByPk(id);

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
  const { provinsi_Id } = req.params;

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
    mgwr
  } = req.body;

  const lastData = await db.IPM_Provinsi.findOne({ order: [ [ 'id', 'DESC' ]] })
  const lastID = lastData.id + 1;

  let id;
  if (idtemp === "0"){
    id = lastID;
  } else{
    id = idtemp;
  }

  // const lastData = await db.IPM_Provinsi.findOne({ order: [ [ 'createdAt', 'DESC' ]] })
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
    mgwr,
    provinsi_Id
  };

  try {
    // check if name exist
    const existData = await db.IPM_Provinsi.findOne({ where: { provinsi_Id, tahun } })
    if (existData) {
      return res.status(409).json({
        success: false,
        flag: true,
        message: "Data IPM Provinsi pada Tahun tersebut sudah ada!"
      });
    };

    const createdData = await db.IPM_Provinsi.create(createData);

    return res.status(200).json({
      success: true,
      data: createdData,
      message: "Data IPM Provinsi Berhasil Ditambah!"
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

    const deletedData = await db.IPM_Provinsi.findByPk(id);

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