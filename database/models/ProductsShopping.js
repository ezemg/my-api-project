module.exports = (sequelize, dataTypes) => {
  let alias = "ProductsShopping";

  let cols = {
    id_product_shopping: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },

    id_products: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },

    id_shopping: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },

    // Revisar longitud de descripcion en DB y luego pasar a modelos. 255 es muy poco
  };

  let config = {
    tableName: "products_shopping",
    timestamps: false,
  };

  const ProductsShopping = sequelize.define(alias, cols, config);

  ProductsShopping.associate = models => {
    ProductsShopping.belongsTo(models.Products, {
      as: "products",
      foreignKey: "id_products",
    });

    ProductsShopping.belongsTo(models.Shoppings, {
      as: "shopping",
      foreignKey: "id_shopping",
    });
  };

  return ProductsShopping;
};
