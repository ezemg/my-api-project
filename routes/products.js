const express = require("express");
const router = express.Router();

const dataValidations = require("../middlewares/dataValidationMiddleware.js");

const productsController = require("../controllers/productsController.js");

router.get("/", productsController.listAllProducts);
router.get("/:id", productsController.productDetail);

router.post("/create", productsController.createNewProduct);

router.put("/edit/:id", productsController.editProduct);

router.delete("/delete/:id", productsController.deleteProduct);

module.exports = router;
