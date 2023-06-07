const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');

/* GET users listing. */
router.get("/", carsController.get);
router.get("/:id", carsController.getOne);
router.post("/", carsController.post);
router.delete("/:id", carsController.remove);

module.exports = router;
