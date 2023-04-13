import express from 'express';
import cartRouter from './routes/cart.js'
import productsRouter from './routes/products.js'
import viewsRouter from './routes/views.js';
import { engine } from 'express-handlebars';

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('dirname', __dirname)

// Crear servidor express
const app = express();
const PORT = 8080;

// Lectura y parseo del body
app.use( express.json() );

//
app.use( express.urlencoded( {extended: true }))
// directorio público
app.use( express.static('public') );


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, "./views"));



// Crear grupos de rutas
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/views',viewsRouter)



app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT} `);
});

