

const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");
const math = require('mathjs');

module.exports.getCalcProvinsi = async function (req, res) {
  try {
    const dataType = req.params.dataType;
    const year = req.params.year;

    const dataCalc = await db.IPM_Provinsi.findAll(
      {
        attributes: ['id',[dataType, 'value'],'provinsi_Id'],
        where: {tahun: year},
        order: [['provinsi_Id', 'ASC']],
      }
    );

    let n;
    if(dataType === 'ipm' || dataType === 'mgwr'){n = 0.7;}
    else if(dataType === 'uhh'){n=0.8}
    else if(dataType === 'ahls' || dataType === 'ppd'){n=0.6}
    else if(dataType === 'arls' || dataType === 'iuhh'){n=0.4}
    else {n=0.5}

    let arrTotal = [];
    dataCalc.forEach(item => {
      arrTotal.push(parseFloat(item.dataValues.value));
    });

    let totalData = 0;
    for (i=0; i < arrTotal.length; i++){
      totalData += arrTotal[i];
    }

    const totalProvinsi = dataCalc.length;
    const average = totalData / totalProvinsi;

    const stdev = math.std(arrTotal); 
    const min = average - (n * stdev);
    const max = average + (n * stdev);

    const dataCalculate = {
      dataValue: dataType,
      sumData: totalData,
      totalProvinsi,
      average,
      stdev,
      min,
      max,
    }
    return res.status(200).json({
      success: true,
      message: 'success',
      data: dataCalculate
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getCalcKabKot = async function (req, res) {
  try {
    const dataType = req.params.dataType;
    const year = req.params.year;

    const dataCalc = await db.IPM_Kabupaten_Kota.findAll(
      {
        attributes: ['id',[dataType, 'value'],'kabupaten_kota_Id'],
        where: {tahun: year},
        order: [['kabupaten_kota_Id', 'ASC']],
      }
    );

    let n;
    if(dataType === 'ipm' || dataType === 'mgwr'){n = 0.8;}
    else if(dataType === 'uhh'){n=0.8}
    else if(dataType === 'ahls' || dataType === 'ppd'){n=0.6}
    else if(dataType === 'arls' || dataType === 'iuhh'){n=0.4}
    else {n=0.5}

    let arrTotal = [];
    dataCalc.forEach(item => {
      arrTotal.push(parseFloat(item.dataValues.value));
    });

    let totalData = 0;
    for (i=0; i < arrTotal.length; i++){
      totalData += arrTotal[i];
    }

    const totalKabKot = dataCalc.length;
    const average = totalData / totalKabKot;

    const stdev = math.std(arrTotal); 
    const min = average - (n * stdev);
    const max = average + (n * stdev);

    const dataCalculate = {
      dataValue: dataType,
      sumData: totalData,
      totalKabKot,
      average,
      stdev,
      min,
      max,
    }
    return res.status(200).json({
      success: true,
      message: 'success',
      data: dataCalculate
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getAllTotal = async function (req, res) {
  try {
    const totalProv = await db.Provinsi.findAll();
    const totalKabKot = await db.Kabupaten_Kota.findAll();
    const totalDataProv = await db.IPM_Provinsi.findAll();
    const totalDataKabKot = await db.IPM_Kabupaten_Kota.findAll();

    let totalData = totalDataKabKot.length + totalDataProv.length;

    return res.status(200).json({
      sucess: true,
      total: totalData,
      prov: totalProv.length,
      kabkot: totalKabKot.length,
      dataProv: totalDataProv.length,
      dataKabkot: totalDataKabKot.length,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getGWRProvinsi = async function (req, res) {
  try {
    const year = req.params.year;
    let dataGWR;

    dataGWR = await db.IPM_Provinsi.findAll({
      attributes: ['id', 'tahun', 'ipm', 'iuhh', 'ipthn', 'iplrn', ['mgwr', 'value'], 'provinsi_Id'],
      where: {tahun: year},
      include: [
        {
          model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi','latitude','longitude']
        }
      ],
      group: ['Provinsi.id', 'IPM_Provinsi.provinsi_Id','IPM_Provinsi.id'],
      order: [['provinsi_Id', 'ASC'],['tahun', 'ASC']]
    })

    let temp, arrSplit;
    const arrayTemp = [];
    dataGWR.map((item, i) => {
      temp = item.dataValues.value + '';
      arrSplit = temp.split("+");
      arrayTemp.push({
        'id': item.id,
        'iuhh_r': item.iuhh,
        'ipthn_r': item.ipthn,
        'iplrn_r': item.iplrn,
        'ipm': item.ipm,
        'intercept': parseFloat(arrSplit[0]),
        'iuhh': parseFloat(arrSplit[1]),
        'ipthn': parseFloat(arrSplit[2]),
        'iplrn': parseFloat(arrSplit[3]),
        'Provinsi': item.Provinsi,
        'provinsi_Id': item.provinsi_Id
        });
    });

    return res.status(200).json({
      sucess: true,
      data: arrayTemp,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getGWRKabKot = async function (req, res) {
  try {
    const year = req.params.year;
    let dataGWR;

    dataGWR = await db.IPM_Kabupaten_Kota.findAll({
      attributes: ['id', 'tahun', 'ipm', 'iuhh', 'ipthn', 'iplrn', ['mgwr', 'value'], 'kabupaten_kota_Id'],
      where: {tahun: year},
      include: [
        {
          model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', required: false, attributes: ['id','nama_kabupaten_kota','latitude','longitude']
        }
      ],
      group: ['Kabupaten_Kotum.id', 'IPM_Kabupaten_Kota.kabupaten_kota_Id','IPM_Kabupaten_Kota.id'],
      order: [['kabupaten_kota_Id', 'ASC'],['tahun', 'ASC']]
    })

    let temp, arrSplit;
    const arrayTemp = [];
    dataGWR.map((item, i) => {
      temp = item.dataValues.value + '';
      arrSplit = temp.split("+");
      arrayTemp.push({
        'id': item.id,
        'iuhh_r': item.iuhh,
        'ipthn_r': item.ipthn,
        'iplrn_r': item.iplrn,
        'ipm': item.ipm,
        'intercept': parseFloat(arrSplit[0]),
        'iuhh': parseFloat(arrSplit[1]),
        'ipthn': parseFloat(arrSplit[2]),
        'iplrn': parseFloat(arrSplit[3]),
        'Kabupaten_Kotum': item.Kabupaten_Kotum,
        'kabupaten_kota_Id': item.kabupaten_kota_Id
        });
    });

    return res.status(200).json({
      sucess: true,
      data: arrayTemp,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getCalcGWRProvinsi = async function (req, res) {
  try {
    const dataType = req.params.dataType;
    const year = req.params.year;

    const dataCalc = await db.IPM_Provinsi.findAll(
      {
        attributes: ['id',['mgwr', 'value'],'provinsi_Id'],
        where: {tahun: year},
        order: [['provinsi_Id', 'ASC']],
      }
    );

    let n = 0.5;
    let type = 0
    if(dataType === 'iuhh' ){type = 1;}
    else if(dataType === 'ipthn'){type=2}
    else if(dataType === 'iplrn'){type=3}
    else {type=0}

    let arrTotal = [];
    dataCalc.forEach(item => {
      temp = item.dataValues.value + '';
      arrSplit = temp.split("+");
      value = arrSplit[type];
      arrTotal.push(parseFloat(value));
    });

    let totalData = 0;
    for (i=0; i < arrTotal.length; i++){
      totalData += arrTotal[i];
    }

    const totalProvinsi = dataCalc.length;
    const average = totalData / totalProvinsi;

    const stdev = math.std(arrTotal); 
    const Q1 = average - (n * 2 * stdev);
    const Q2 = average - (n * stdev);
    const Q3 = average + (n * stdev);
    const Q4 = average + (n * 2 * stdev);

    const dataCalculate = {
      dataValue: dataType,
      sumData: totalData,
      totalProvinsi,
      average,
      stdev,
      Q1,
      Q2,
      Q3,
      Q4,
    }
    return res.status(200).json({
      success: true,
      message: 'success',
      data: dataCalculate
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getCalcGWRKabKot = async function (req, res) {
  try {
    const dataType = req.params.dataType;
    const year = req.params.year;

    const dataCalc = await db.IPM_Kabupaten_Kota.findAll(
      {
        attributes: ['id',['mgwr', 'value'],'kabupaten_kota_Id'],
        where: {tahun: year},
        order: [['kabupaten_kota_Id', 'ASC']],
      }
    );

    let n = 0.5;
    let type = 0
    if(dataType === 'iuhh' ){type = 1;}
    else if(dataType === 'ipthn'){type=2}
    else if(dataType === 'iplrn'){type=3}
    else {type=0}

    let arrTotal = [];
    dataCalc.forEach(item => {
      temp = item.dataValues.value + '';
      arrSplit = temp.split("+");
      value = arrSplit[type];
      arrTotal.push(parseFloat(value));
    });

    let totalData = 0;
    for (i=0; i < arrTotal.length; i++){
      totalData += arrTotal[i];
    }

    const totalKabKot = dataCalc.length;
    const average = totalData / totalKabKot;

    const stdev = math.std(arrTotal); 
    const Q1 = average - (n * 2 * stdev);
    const Q2 = average - (n * stdev);
    const Q3 = average + (n * stdev);
    const Q4 = average + (n * 2 * stdev);

    const dataCalculate = {
      dataValue: dataType,
      sumData: totalData,
      totalKabKot,
      average,
      stdev,
      Q1,
      Q2,
      Q3,
      Q4,
      // data: arrTotal
      // dataRegion: dataProvinsi
    }
    return res.status(200).json({
      success: true,
      message: 'success',
      data: dataCalculate
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}