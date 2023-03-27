import {Router} from 'express';
import multer from 'multer'
const upload = multer({ dest: 'public/images/products' })

import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controllers.js';


// instancio mi router en este archivo
const router = Router();

router.get('', getAllProducts); //http://localhost:8080/api/products
router.get('/:id', getProductById); //http://localhost:8080/api/products/:id
router.post('', upload.single('thumbnail') ,addProduct); //http://localhost:8080/api/products
router.put('/:id', updateProduct) // http://localhost:8080/api/products/:id
router.delete('/:id', deleteProduct) // http://localhost:8080/api/products/:id

// se exporta con nombre "productsRouter"
export default router;