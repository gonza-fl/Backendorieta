import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import initializePassport from './auth/passport.js';
import __dirname from './utils.js';

import db from './database/database.js';

import cartRouter from './routes/cart.routes.js';
import productsRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.routes.js';
import sessionsRouter from './routes/sessions.routes.js';
import morgan from 'morgan';
import passport from 'passport';

const { URI, TTL, SESSION_SECRET } = process.env;

// Crear servidor express
const app = express();
const PORT = 8080;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: URI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: TTL,
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

//Conetar base de datos
await db();

// Crear grupos de rutas
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/views', viewsRouter);
app.use('/', viewsRouter);

app.listen(PORT, function () {
  console.log(`Servidor corriendo en puerto ${PORT} `);
  console.log(`http://localhost:${PORT} `);
});
