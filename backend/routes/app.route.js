const express = require('express')
const router = express.Router()
const AppController = require('../controllers/app.controller')
const { authenticate } = require('../middlewares/auth.middleware')

router.post('/product', authenticate, AppController.addProduct)
router.get('/product/all', AppController.allProduct)
router.get('/product/user', authenticate, AppController.productByUserId)
router.patch('/product/delete', AppController.delProduct)
router.put('/product/update/:id', AppController.updateProduct)
router.get('/user', authenticate, AppController.currentUser)
router.post('/signup', AppController.signup)
router.post('/signin', AppController.signin)

module.exports = router