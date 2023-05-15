const path = require("path");
const { body } = require("express-validator");

const dataValidations = {
  registerUser: [
    body("name")
      .notEmpty()
      .withMessage("Name field cannot be empty")
      .bail()
      .isLength({ min: 2 })
      .withMessage("Name needs to be at least 2 characters long"),

    body("last_name")
      .notEmpty()
      .withMessage("Last name field cannot be empty")
      .bail()
      .isLength({ min: 2 })
      .withMessage("Last name needs to be at least 2 characters long"),

    body("email")
      .notEmpty()
      .withMessage("Email field cannot be empty")
      .bail()
      .isEmail()
      .withMessage("email needs to be in valid format"),

    body("password")
      .notEmpty()
      .withMessage("Password field cannot be empty")
      .bail()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage(
        "Password needs to have at least one lower case, one capital case, one number and one special character"
      )
      .bail()
      .isLength({ min: 8, max: 32 })
      .withMessage("Password minimum characters is 8 and maximum is 32"),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Need to confirm password")
      .bail()
      .custom(async (confirmPassword, { req }) => {
        const password = req.body.password;
        if (password !== confirmPassword) {
          throw new Error("Passwords need to match");
        }
      }),
    // body("avatar").custom((value, { req }) => {
    //   let file = req.file;
    //   let aceptedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

    //   console.log("===========================");
    //   console.log(file);
    //   console.log("===========================");

    //   if (!file) {
    //     throw new Error("Tienes que subir una imagen");
    //   } else {
    //     let fileExtensions = path.extname(file.originalname);
    //     if (!aceptedExtensions.includes(fileExtensions)) {
    //       throw new Error(
    //         `La extensiones validas son ${aceptedExtensions.join(", ")}`
    //       );
    //     }
    //   }
    //   return true;
    // }),
  ],
  editUser: [
    body("name")
      .notEmpty()
      .withMessage("Name field cannot be empty")
      .bail()
      .isLength({ min: 2 })
      .withMessage("Name needs to be at least 2 characters long"),

    body("last_name")
      .notEmpty()
      .withMessage("Last name field cannot be empty")
      .bail()
      .isLength({ min: 2 })
      .withMessage("Last name needs to be at least 2 characters long"),

    body("email")
      .notEmpty()
      .withMessage("Email field cannot be empty")
      .bail()
      .isEmail()
      .withMessage("email needs to be in valid format"),

    body("password")
      .notEmpty()
      .withMessage("Password field cannot be empty")
      .bail()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage(
        "Password needs to have at least one lower case, one capital case, one number and one special character"
      )
      .bail()
      .isLength({ min: 8, max: 32 })
      .withMessage("Password minimum characters is 8 and maximum is 32"),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Need to confirm password")
      .bail()
      .custom(async (confirmPassword, { req }) => {
        const password = req.body.password;
        if (password !== confirmPassword) {
          throw new Error("Passwords need to match");
        }
      }),
  ],
};

module.exports = dataValidations;
