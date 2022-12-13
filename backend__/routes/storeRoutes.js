
import express from 'express';

const router = express.Router();
import { getStores, addStore } from '../controllers/storeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getStores).post(addStore);


export default router;
