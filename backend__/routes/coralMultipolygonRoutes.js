import express from 'express';

const router = express.Router();
import { addCoralMultiPolygon, getCoralMultipolygons,getCoralMultipolygonById, deleteMultipolygon } from '../controllers/coralMultipolygonController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCoralMultipolygons).post(addCoralMultiPolygon);
//router.route('/:id/reviews').post(createCoralReview)
//router.get('/top', getTopProducts)
router.route('/:id').get(getCoralMultipolygonById).delete(protect,admin,deleteMultipolygon)
  //.put(protect, admin, updateProduct)

export default router;


