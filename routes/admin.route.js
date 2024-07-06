const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/admin.controller.js');

adminRouter.get('/', adminController.getAll);
adminRouter.post('/register', adminController.registerAdmin);
adminRouter.post('/login', adminController.login);
adminRouter.post('/logout', adminController.logout);
adminRouter.get('/:id', adminController.getAdminById);
adminRouter.put('/update/:id', adminController.updateDataAdmin);
adminRouter.put('/updatepass/:id', adminController.updatePassAdmin);

module.exports = adminRouter;