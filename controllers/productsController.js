const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const { validationResult } = require("express-validator");

const { v4: uuidv4 } = require("uuid");

const productsController = {
  // list all products
  listAllProducts: async (req, res) => {
    try {
      let products = await db.Products.findAll({
        include: [{ association: "category" }, { association: "shoppings" }],
      });

      let categories = await db.Categories.findAll({
        include: [{ association: "Product" }],
      });

      let response = {
        status: 200,
        count: products.length,
        countByCategory: categories.reduce(
          (acc, cur) => ({ ...acc, [cur.name]: cur.Product.length }),
          {}
        ),
        url: "/products",
        products: products.map(e => {
          return {
            id: e.id_products,
            name: e.name,
            description: e.description,
            image: e.image,
            price: e.price,
            category: e.category.name,
            url: `/products/${e.id_products}`,
          };
        }),
      };
      res.json(response);
    } catch (error) {
      res.json(error.message);
    }
  },
  // product detail
  productDetail: async (req, res) => {
    try {
      let product = await db.Products.findByPk(req.params.id, {
        include: [{ association: "category" }, { association: "shoppings" }],
      });

      let response = {
        status: 200,
        data: {
          id: product.id_products,
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          category: product.category,
        },
        url: `/products/${product.id_products}`,
        image_url: `/images/productos/${product.image}`,
      };

      res.json(response);
    } catch (error) {
      console.log(error.message);
    }
  },
  // create product
  createNewProduct: async (req, res) => {},
  // edit product
  editProduct: async (req, res) => {},
  // delete product
  deleteProduct: async (req, res) => {},
};

module.exports = productsController;
