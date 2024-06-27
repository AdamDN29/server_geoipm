const express = require('express');
const provinsiRouter = express.Router();
const provinsiController = require('../controllers/provinsi.controller.js');

provinsiRouter.get('/', provinsiController.getAll);
provinsiRouter.get('/:id', provinsiController.getProvinsiById);
provinsiRouter.put('/update/:id', provinsiController.updateProvinsi);
provinsiRouter.post('/create/', provinsiController.createProvinsi);
provinsiRouter.delete('/delete/:id', provinsiController.deleteDataById);

module.exports = provinsiRouter;