const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");
const { Op } = require("sequelize");

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

module.exports.login = async function (req, res) {
  try {
    const admin = await db.admin.findOne({ 
      where: {      
        [Op.or]: [
          { email: req.body.email  },
          { username: req.body.email  }
        ]   
      } 
    });
    if (admin) {
      // const password = bcrypt.compareSync(req.body.password, admin.password);
      if (admin.password === req.body.password) {
        // const token = await jwt.sign(
        //   { id: admin.id, name: admin.nama },
        //   process.env.SECRET_TOKEN,
        //   { expiresIn: "1h" }
        // );
        // res.cookie("jwt", token, {
        //   maxAge: 60 * 60 * 1000,
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "none",
        // });
        return res.status(200).json({
          success: true,
          message: "Login Berhasil",
          data: {
            idAdmin: admin.id,
            email: admin.email,
            nama: admin.nama,
            username: admin.username,
          },
        });
      }
      return res.status(401).json({
        success: false,
        message: "Email dan Password Tidak Sesuai!",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Email Tidak Ditemukan!",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.getAdminById = async function (req, res) {
  const id = req.params.id;
  try {
    const data = await db.admin.findByPk(id);

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
      password,
    } = req.body;

    const editData = {
      password,
    };

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