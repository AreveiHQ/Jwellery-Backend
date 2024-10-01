const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');
const { adminAuth } = require('../Middleware/adminAuth');
const multer = require('multer');
const upload = multer({
        storage:multer.diskStorage({
                filename:function(req,file,cb){
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                        cb(null,uniqueSuffix+file.originalname)
                }
        })
      });

router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProduct);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/category/:category/:subcategory', productController.getProductsBySubCategory);
router.get('/:id', productController.getProductById);
router.post('/',upload.array('images'), productController.createProduct);
router.put('/:id',adminAuth, productController.updateProduct);
router.delete('/:id',adminAuth, productController.deleteProduct);

module.exports = router;
