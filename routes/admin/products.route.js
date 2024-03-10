const express = require("express");
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
const controllers = require("../../controllers/admin/products.controller");

router.get('/',controllers.index );
router.patch('/change-status/:status/:id',controllers.changeStatus);
router.patch('/change-multi',controllers.changeMulti);
router.delete('/delete/:id',controllers.deleted);
router.get('/create',controllers.create );
router.post('/create', upload.single('thumbnail'),controllers.createPost );



module.exports = router;