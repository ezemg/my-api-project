const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const usersController = {
  // Listar todos los usuarios
  listAllUsers: async (req, res) => {
    res.json("Aca van todos los usuarios");
  },
  // Detalle de usuario

  // Crear nuevo usuario

  // Modificar usuario existente

  // Eliminar usuario
};

module.exports = usersController;
