const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware")

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id',authMiddleware, userController.deleteUser)
router.get('/get-all-user',authMiddleware, userController.getAllUser)
router.get('/get-detail-user/:id',authUserMiddleware, userController.getDetailUser)
router.post('/refresh-token', userController.refreshToken)

module.exports = router