const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validate/products-category.validate")



const controllers = require("../../controllers/admin/products-category.controller");

router.get('/', controllers.index);
router.get('/create', controllers.create);
router.post('/create', upload.single('thumbnail'),uploadCloud.upload,validate.createProductCategory ,controllers.createPost);
router.patch("/change-multi",controllers.changeMulti);
router.patch('/change-status/:status/:id', controllers.changeStatus);
router.delete('/delete/:id', controllers.deleted);
router.get("/edit/:id",controllers.edit);
router.patch("/edit/:id",upload.single('thumbnail'),uploadCloud.upload,validate.createProductCategory ,controllers.editPatch);


module.exports = router;

