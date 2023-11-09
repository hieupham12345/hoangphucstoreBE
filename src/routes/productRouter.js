const express = require("express")
const router = express.Router()
const productController = require('../controllers/productController')
const { authMiddleware } = require("../middleware/authMiddleware")

router.post('/create' , authMiddleware, productController.createProduct)
router.get('/get-detail/:id', authMiddleware, productController.getProduct)
router.put('/update/:id', authMiddleware, productController.updateProduct)
router.delete('/delete/:id', authMiddleware, productController.deleteProduct)
router.get('/get-all', productController.getAllProduct)


module.exports = router