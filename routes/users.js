const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");

router.get("/", usersController.listAllUsers);

module.exports = router;
