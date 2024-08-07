const express = require('express');
const calculateRouter = express.Router();
const calculateController = require('../controllers/calculation.controller.js');

calculateRouter.get('/getProvinsi/:dataType/:year', calculateController.getCalcProvinsi);
calculateRouter.get('/getKabKot/:dataType/:year', calculateController.getCalcKabKot);
calculateRouter.get('/getTotal/', calculateController.getAllTotal);
calculateRouter.get('/getGWRProvinsi/:year', calculateController.getGWRProvinsi);
calculateRouter.get('/getGWRKabKot/:year', calculateController.getGWRKabKot);
calculateRouter.get('/getCalcGWRProvinsi/:dataType/:year', calculateController.getCalcGWRProvinsi);
calculateRouter.get('/getCalcGWRKabKot/:dataType/:year', calculateController.getCalcGWRKabKot);

module.exports = calculateRouter;