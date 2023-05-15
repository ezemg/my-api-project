module.exports = (sequelize, dataTypes) => {
  let alias = "Shoppings";

  let cols = {
    id_shopping: {
      type: dataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    price: {
      type: dataTypes.FLOAT,
    },

    price: {
      type: dataTypes.FLOAT,
    },

    id_user: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },

    // Revisar longitud de descripcion en DB y luego pasar a modelos. 255 es muy poco
  };

  let config = {
    tableName: "shopping",
    timestamps: false,
  };

  const Shopping = sequelize.define(alias, cols, config);

  Shopping.associate = models => {
    Shopping.belongsTo(models.Users, {
      as: "User",
      foreignKey: "id_user",
    });

    Shopping.belongsTo(models.ShoppingStatus, {
      as: "ShoppingStatus",
      foreignKey: "shopping_status_id",
    });

    Shopping.belongsToMany(models.Products, {
      as: "Products",
      through: "products_shopping",
      foreignKey: "id_shopping",
      otherKey: "id_products",
      timestamps: false,
    });
  };

  return Shopping;
};
