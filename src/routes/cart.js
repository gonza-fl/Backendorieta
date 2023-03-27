import {Router} from 'express';
import { addItem, getItems } from '../controllers/cart.controllers.js';
const router = Router();

router.get('', getItems);
router.post('', addItem);

export default router;