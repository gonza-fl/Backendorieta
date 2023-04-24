import { Router } from 'express';
import {
  register,
  login,
  restore,
  logout,
} from '../controllers/sessions.controllers.js';
import passport from 'passport';

const router = Router();

router.post(
  '/register',
  passport.authenticate('register', {
    failureRedirect: 'failRegister',
  }),
  register
);

router.get('/failRegister', (req, res) => {
  console.log('Failed Register');
  return res.send({ status: 'error', error: 'authentication error' });
});

router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: 'failLogin',
  }),
  login
);

router.get('/failLogin', (req, res) => {
  res.send({ status: 'error', error: 'failed login' });
});

router.put('/restore', restore);

router.get('/logout', logout);

export default router;
