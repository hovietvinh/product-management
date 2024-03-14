const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/client/products.controller");


router.get('/', controllers.index);
router.get('/:slug', controllers.detail);

module.exports = router;