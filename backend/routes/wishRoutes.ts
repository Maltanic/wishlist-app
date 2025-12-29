import express from 'express'
import { getAllWishes, getWishById, createWish, deleteWish, updateWish } from '../controllers/wishController.ts'

const router = express.Router();

router.get('/', getAllWishes);
router.get('/:id', getWishById);
router.post('/', createWish);
router.put('/:id', updateWish);
router.delete('/:id', deleteWish);

export default router;