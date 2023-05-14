const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");

router.get("/", usersController.listAllUsers);
router.get("/:id", usersController.userDetail);

router.post("/register", usersController.createNewUser);

router.put("/edit/:id", usersController.editUser);

router.delete("/delete/:id", usersController.deleteUser);

module.exports = router;
