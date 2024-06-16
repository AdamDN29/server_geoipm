const express = require('express');
const provinsiRouter = express.Router();
const provinsiController = require('../controllers/provinsi.controller.js');

provinsiRouter.get('/', provinsiController.getAll);
provinsiRouter.get('/:id', provinsiController.getProvinsiById);
provinsiRouter.put('/update/:id', provinsiController.updateProvinsi);

module.exports = provinsiRouter;