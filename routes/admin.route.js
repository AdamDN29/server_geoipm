const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/admin.controller.js');

adminRouter.get('/', adminController.getAll);
adminRouter.post('/login', adminController.login);
adminRouter.get('/:id', adminController.getAdminById);
adminRouter.put('/update/:id', adminController.updateDataAdmin);
adminRouter.put('/updatepass/:id', adminController.updatePassAdmin);

module.exports = adminRouter;