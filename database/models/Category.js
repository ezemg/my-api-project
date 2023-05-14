module.exports = (sequelize, dataTypes) => {
  let alias = "Categories";

  let cols = {
    category_id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name: {
      type: dataTypes.STRING,
    },

    // Revisar longitud de descripcion en DB y luego pasar a modelos. 255 es muy poco
  };

  let config = {
    tableName: "category",
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = models => {
    Category.hasMany(models.Products, {
      as: "Product",
      foreignKey: "category_id",
    });
  };

  return Category;
};
