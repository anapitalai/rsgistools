// import express from 'express'
// const router = express.Router()
// const { getStores, addStore } = require('../controllers/stores');

// const router = express.Router();

// router
//   .route('/')
//   .get(getStores)
//   //.post(addStore);

// export default router
import express from 'express';

const router = express.Router();
import { getStores, addStore } from '../controllers/storeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getStores).post(addStore);
// router.route('/:id/reviews').post(protect, createProductReview)
//router.get('/top', getTopProducts)
// router
//   .route('/:id')
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct)

export default router;
