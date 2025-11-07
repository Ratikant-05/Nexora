import express from 'express'
import { getAllProductsController, AddToCartController, getCartController, deleteItemController, checkoutController } from '../Controllers/productController.js'

const router = express.Router()

router.get('/products', getAllProductsController)
router.post('/cart', AddToCartController)
router.get('/getCart' , getCartController)
router.delete('/deleteItem/:id', deleteItemController)
router.post('/checkout' , checkoutController)

export default router