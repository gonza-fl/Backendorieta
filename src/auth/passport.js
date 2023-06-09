import passport from 'passport';
import local from 'passport-local';
import User from '../models/User.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age } = req.body;

          const user = await User.findOne({ email: username });
          if (user) {
            console.log('User already exists');
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };

          const result = await User.create(newUser);

          return done(null, result);
        } catch (error) {
          return done('Error when trying to find user: ' + error);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ email: username });
          if (!user) return done(null, false);

          if (!isValidPassword(user, password)) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

export default initializePassport;
