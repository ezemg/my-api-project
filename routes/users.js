const express = require("express");
const router = express.Router();

const dataValidations = require("../middlewares/dataValidationMiddleware.js");

const usersController = require("../controllers/usersController.js");

router.get("/", usersController.listAllUsers);
router.get("/:id", usersController.userDetail);

router.post(
  "/register",
  dataValidations.registerUser,
  usersController.createNewUser
);

router.put("/edit/:id", dataValidations.editUser, usersController.editUser);

router.delete("/delete/:id", usersController.deleteUser);

module.exports = router;
