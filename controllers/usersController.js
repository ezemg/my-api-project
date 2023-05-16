const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const { validationResult } = require("express-validator");

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const usersController = {
  // Listar todos los usuarios
  listAllUsers: async (req, res) => {
    try {
      let users = await db.Users.findAll({
        include: [{ association: "userCategory" }],
      });

      let response = {
        status: 200,
        count: users.length,
        url: "/usuarios",
        users: users.map(e => {
          return {
            id: e.id,
            first_name: e.name,
            last_name: e.last_name,
            email: e.email,
            avatar: e.avatar,
            detail: `/users/${e.id}`,
            password: e.password,
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

      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  // Crear nuevo usuario

  createNewUser: async (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0)
      return res.json(resultValidation.mapped());

    try {
      let userInDb = await db.Users.findOne({
        where: { email: req.body.email },
      });

      if (userInDb) {
        throw new Error("Email already registered");
      }

      await db.Users.create({
        id: uuidv4(),
        id_user_category: 1,
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
      });

      res.redirect("/users");
    } catch (error) {
      res.json(error.message);
    }
  },

  // Modificar usuario existente
  editUser: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0)
        return res.json(resultValidation.mapped());

      let userToEdit = await db.Users.findByPk(req.params.id);

      if (!userToEdit) throw new Error("No user found!");

      await db.Users.update(
        {
          name: req.body.name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          avatar: req.body.avatar,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.redirect("/users");
    } catch (error) {
      res.json(error.message);
    }
  },
  // Eliminar usuario

  deleteUser: async (req, res) => {
    try {
      await db.Users.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.redirect("/users");
    } catch (error) {
      res.json(error.message);
    }
  },
};

module.exports = usersController;
