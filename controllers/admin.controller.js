const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.admin.findAll();

    return res.status(200).json({
      sucess: true,
      data: allData
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.registerAdmin = async function (req, res) {
  try {
      const { nama, email, username, password } = req.body;
      // Check if the email exists
      const userExists = await db.admin.findOne({
          where: {      
            [Op.or]: [
              { email  },
              { username }
            ]   
          } 
      });
      if (userExists) {
          return res.status(400).send('Email atau username sudah ada');
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      await db.admin.create({
          nama,
          email,
          username,
          password: hashPassword,
      });
      return res.status(200).send('Registrasi berhasil');
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
}

module.exports.login = async function (req, res) {
  try {
    const {email, password} = req.body;
    const admin = await db.admin.findOne({ 
      where: {      
        [Op.or]: [
          { email },
          { username: email }
        ]   
      } 
    });
    // Verify Account
    if(!admin){
      return res.status(401).json({
        success: false,
        message: "Email/Username Tidak Ditemukan!",
      });
    }
    // Verify Password
    const passwordValid = await bcrypt.compare(password, admin.password);
    if(!passwordValid){
      return res.status(401).json({
        success: false,
        message: "Email/Username dan Password Tidak Sesuai!",
      });
    }

    // Login process
    const token = await jwt.sign(
      { id: admin.id, name: admin.nama },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      success: true,
      message: "Login Berhasil",
      data: {
        idAdmin: admin.id,
        email: admin.email,
        nama: admin.nama,
        username: admin.username,
        token,
      },
    });

  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });

  return res.status(200).json({
    success: true,
    message: "Logout Berhasil",
  });
};

module.exports.getAdminById = async function (req, res) {
  const id = req.params.id;
  try {
    const data = await db.admin.findByPk(id, {
      attributes: ['id', 'nama', 'username', 'email']});

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
    return res.status(200).json({
      sucess: true,
      data: data
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.updateDataAdmin = async function (req, res) {
  try {
    const { id } = req.params;
    const {
      username,
      nama
    } = req.body;

    const editData = {
      username,
      nama
    }

    const editedData = await db.admin.findByPk(id);

    if (!editedData) {
      return res.status(404).json({
        sucess: false,
        message: 'Data not found!'
      });
    }

    editedData.update(editData);

    return res.status(200).json({
      success: true,
      // data: editedData,
      message: 'Edit Success'
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    });
  }
}

module.exports.updatePassAdmin = async function (req, res) {
  try {
    const { id } = req.params;
    const {
      oldpassword,
      newpassword
    } = req.body;

    const editedData = await db.admin.findByPk(id);

    if (!editedData) {
      return res.status(404).json({
        sucess: false,
        message: 'Data Tidak Ditemukan!'
      });
    }

    // Verify Password
    const passwordValid = await bcrypt.compare(oldpassword, editedData.password);
    if(!passwordValid){
      return res.status(401).json({
        success: false,
        message: "Password Lama Tidak Sesuai!",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newpassword, salt);

    const editData = {
      password : hashPassword,
    }

    editedData.update(editData);

    return res.status(200).json({
      success: true,
      // data: editedData,
      message: 'Edit Berhasil'
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    });
  }
}

