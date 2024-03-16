const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validate/products-category.validate")



const controllers = require("../../controllers/admin/products-category.controller");

router.get('/', controllers.index);
router.get('/create', controllers.create);
router.post('/create', upload.single('thumbnail'),uploadCloud.upload,validate.createProduct ,controllers.createPost);

router.patch("/change-multi",controllers.changeMulti);
router.patch('/change-status/:status/:id', controllers.changeStatus);


module.exports = router;

