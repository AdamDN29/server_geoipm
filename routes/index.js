var express = require('express');
var apiRouter = express.Router();

const adminRouter = require('./admin.route.js');
const provinsiRouter = require('./provinsi.route.js');
const ipm_provinsiRouter = require('./ipm_provinsi.route.js');
const kabupaten_kotaRouter = require('./kabupaten_kota.route.js');
const ipm_kabupaten_kotaRouter = require('./ipm_kabupaten_kota.route.js');
const calculateRouter = require('./calculation.route.js');


apiRouter.use('/admin', adminRouter);
apiRouter.use('/provinsi', provinsiRouter);
apiRouter.use('/ipm_provinsi', ipm_provinsiRouter);
apiRouter.use('/kabupaten_kota', kabupaten_kotaRouter);
apiRouter.use('/ipm_kabupaten_kota', ipm_kabupaten_kotaRouter);
apiRouter.use('/data', calculateRouter);

module.exports = apiRouter;
