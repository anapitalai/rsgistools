import express from 'express'
const router = express.Router()
import {
  getTemperatures,
  getTemperatureById,
  deleteTemperature,
  createTemperature,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/temperatureController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getTemperatures).post(createTemperature)


router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getTemperatureById).delete(deleteTemperature)

router.get('/top', getTopProducts)


export default router
