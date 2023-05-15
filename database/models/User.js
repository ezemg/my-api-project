module.exports = (sequelize, dataTypes) => {
  let alias = "Users";

  let cols = {
    id: {
      type: dataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    id_user_category: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
    },
    last_name: {
      type: dataTypes.STRING,
    },
    email: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING,
    },
    avatar: {
      type: dataTypes.STRING,
    },
    // Revisar longitud de descripcion en DB y luego pasar a modelos. 255 es muy poco
  };

  let config = {
    tableName: "user",
    timestamps: false,
  };
  const User = sequelize.define(alias, cols, config);

  User.associate = models => {
    User.belongsTo(models.UserCategories, {
      as: "userCategory",
      foreignKey: "id_user_category",
    });

    User.hasMany(models.Shoppings, {
      as: "Shopping",
      foreignKey: "id_user",
    });
  };
  return User;
};
