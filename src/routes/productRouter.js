const express = require("express")
const router = express.Router()
const productController = require('../controllers/productController')
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware")

router.post('/create' ,productController.createProduct)
router.get('/get-detail/:id', authMiddleware, productController.getProduct)
router.put('/update/:id', productController.updateProduct)
router.delete('/delete/:id', productController.deleteProduct)
router.get('/get-all', productController.getAllProduct)


module.exports = router