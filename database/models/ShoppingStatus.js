module.exports = (sequelize, dataTypes) => {
  let alias = "ShoppingStatus";

  let cols = {
    id_shopping_status: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },

    name: {
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "shopping_status",
    timestamps: false,
  };

  const ShoppingStatus = sequelize.define(alias, cols, config);

  ShoppingStatus.associate = models => {
    ShoppingStatus.hasMany(models.Shoppings, {
      as: "shopping",
      foreignKey: "shopping_status_id",
    });
  };

  return ShoppingStatus;
};
