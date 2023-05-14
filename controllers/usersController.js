const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const usersController = {
  // Listar todos los usuarios
  listAllUsers: async (req, res) => {
    try {
      let users = await db.Users.findAll({
        include: [{ association: "userCategory" }],
      });

      let usersCategories = await db.UserCategories.findAll({
        include: [{ association: "user" }],
      });

      let response = {
        status: 200,
        count: users.length,
        url: "/api/usuarios",
        users: users.map(e => {
          return {
            id: e.id,
            first_name: e.name,
            last_name: e.last_name,
            email: e.email,
            avatar: e.avatar,
            detail: `/api/users/${e.id}`,
          };
        }),
      };

      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  // Detalle de usuario
  userDetail: async (req, res) => {
    try {
      let user = await db.Users.findByPk(req.params.id, {
        include: [
          {
            association: "userCategory",
          },
        ],
      });
      let response = {
        status: 200,
        data: {
          id: user.id,
          first_name: user.name,
          last_name: user.last_name,
          email: user.email,
          category: user.userCategory.name,
        },
      };

      // res.json(user);
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  // Crear nuevo usuario

  createNewUser: async (req, res) => {
    try {
      let userInDb = await db.Users.findOne({
        where: { email: req.body.email },
      });

      if (userInDb)
        throw new Error("Cannot register, email already registered");

      let userToCreate = await db.Users.create({
        id: Number(String(Date.now()).slice(6)),
        id_user_category: 1,
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      });
    } catch (error) {
      console.log(error);
    }

    res.redirect("/users");
  },

  // Modificar usuario existente

  // Eliminar usuario
};

module.exports = usersController;
