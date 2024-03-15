const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer()
const controllers = require("../../controllers/admin/products.controller");
const validate = require("../../validate/products.validate")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get('/', controllers.index);
router.patch('/change-status/:status/:id', controllers.changeStatus);
router.patch('/change-multi', controllers.changeMulti);
router.delete('/delete/:id', controllers.deleted);
router.get('/create', controllers.create);
router.post('/create', upload.single('thumbnail'),uploadCloud.upload ,validate.createProduct, controllers.createPost);
router.get('/edit/:id', controllers.edit);
router.patch('/edit/:id', upload.single('thumbnail'),uploadCloud.upload ,validate.createProduct, controllers.editPatch);
router.get('/detail/:id', controllers.detail);



module.exports = router;