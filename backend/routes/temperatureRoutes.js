import express from 'express'
const router = express.Router()
import {
  getTemperatures,
  getProductById,
  deleteProduct,
  createTemperature,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/temperatureController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getTemperatures).post(createTemperature)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
