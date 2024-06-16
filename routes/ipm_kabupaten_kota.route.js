const express = require('express');
const ipm_kabupaten_kotaRouter = express.Router();
const ipm_kabupaten_kotaController = require('../controllers/ipm_kabupaten_kota.controller.js');

ipm_kabupaten_kotaRouter.get('/', ipm_kabupaten_kotaController.getAll);
ipm_kabupaten_kotaRouter.get('/:id', ipm_kabupaten_kotaController.getIPM_Kabupaten_KotaById);
ipm_kabupaten_kotaRouter.get('/getAllData/:year', ipm_kabupaten_kotaController.getAllDataKabKot);
ipm_kabupaten_kotaRouter.get('/getOneData/:id/:year', ipm_kabupaten_kotaController.getOneDataKabKot);
ipm_kabupaten_kotaRouter.get('/getManyData/:id/:year', ipm_kabupaten_kotaController.getManyDataKabKot);
ipm_kabupaten_kotaRouter.get('/getData/:dataType/:year', ipm_kabupaten_kotaController.getDataKabKot);
ipm_kabupaten_kotaRouter.get('/getYear/Year', ipm_kabupaten_kotaController.getYearData);
ipm_kabupaten_kotaRouter.get('/getLastData/last', ipm_kabupaten_kotaController.getLastDataIPM);
ipm_kabupaten_kotaRouter.put('/update/:id', ipm_kabupaten_kotaController.updateDataIPM);
ipm_kabupaten_kotaRouter.post('/create/:kabupaten_kota_Id', ipm_kabupaten_kotaController.createDataIPM);
ipm_kabupaten_kotaRouter.delete('/delete/:id', ipm_kabupaten_kotaController.deleteDataById);

module.exports = ipm_kabupaten_kotaRouter;