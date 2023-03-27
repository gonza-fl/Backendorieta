import express from 'express';
import ProductManager from './helpers/productManager.js';
import cartRouter from './routes/cart.js'
import productsRouter from './routes/products.js'

// Crear servidor express
const app = express();
const PORT = 8080;

// Lectura y parseo del body
app.use( express.json() );

//
app.use( express.urlencoded( {extended: true }))
// directorio público
app.use( express.static('public') );

// Crear grupos de rutas
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);



app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT} `);
});

