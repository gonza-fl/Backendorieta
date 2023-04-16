import { Router } from 'express';
import {
  addItem,
  createCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getItems,
  updateCartProducts,
  updateProductQuantityInCart,
} from '../controllers/cart.controllers.js';
const router = Router();

router.post('/', createCart);
router.post('/:cid', addItem);
router.get('/:cid', getItems);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.delete('/:cid', deleteAllProductsFromCart);
router.put('/:cid', updateCartProducts);
router.patch('/:cid/products/:pid', updateProductQuantityInCart);

export default router;
