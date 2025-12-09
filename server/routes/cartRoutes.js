import express from 'express';
import {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.route('/')
  .get(getCart)
  .post(addToCart)
  .delete(clearCart);

router.route('/:variantId')
  .put(updateQuantity)
  .delete(removeItem);

export default router;