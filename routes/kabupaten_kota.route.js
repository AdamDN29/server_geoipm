const express = require('express');
const kabupaten_kotaRouter = express.Router();
const kabupaten_kotaController = require('../controllers/kabupaten_kota.controller.js');

kabupaten_kotaRouter.get('/', kabupaten_kotaController.getAll);
kabupaten_kotaRouter.get('/getKabKotbyProvinsi/:id', kabupaten_kotaController.getKabKotbyProvinsi);
kabupaten_kotaRouter.get('/:id', kabupaten_kotaController.getKabupaten_KotaById);
kabupaten_kotaRouter.put('/update/:id', kabupaten_kotaController.updateKabKot);

module.exports = kabupaten_kotaRouter;