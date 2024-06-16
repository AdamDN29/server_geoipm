const express = require('express');
const ipm_provinsiRouter = express.Router();
const ipm_provinsiController = require('../controllers/ipm_provinsi.controller.js');

ipm_provinsiRouter.get('/', ipm_provinsiController.getAll);
ipm_provinsiRouter.get('/:id', ipm_provinsiController.getIPMProvinsiById);
ipm_provinsiRouter.get('/getAllData/:year', ipm_provinsiController.getAllDataProvinsi);
ipm_provinsiRouter.get('/getOneData/:id/:year', ipm_provinsiController.getOneDataProvinsi);
ipm_provinsiRouter.get('/getData/:dataType/:year', ipm_provinsiController.getDataProvinsi);
ipm_provinsiRouter.get('/getYear/Year', ipm_provinsiController.getYearData);
ipm_provinsiRouter.get('/getLastData/last', ipm_provinsiController.getLastDataIPM);
ipm_provinsiRouter.put('/update/:id', ipm_provinsiController.updateDataIPM);
ipm_provinsiRouter.post('/create/:provinsi_Id', ipm_provinsiController.createDataIPM);
ipm_provinsiRouter.delete('/delete/:id', ipm_provinsiController.deleteDataById);

module.exports = ipm_provinsiRouter;