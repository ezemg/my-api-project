module.exports = {
  development: {
    username: "root",
    password: "",
    database: "dh_bikes_new",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "",
    database: "database_test",
    host: "dh_bikes_new",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "",
    database: "database_production",
    host: "dh_bikes_new",
    dialect: "mysql",
  },
};
