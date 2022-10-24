import express from 'express';

const router = express.Router();
import { getCorals, addCoral } from '../controllers/coralController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCorals).post(addCoral);
// router.route('/:id/reviews').post(protect, createProductReview)
//router.get('/top', getTopProducts)
// router
//   .route('/:id')
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct)

export default router;
