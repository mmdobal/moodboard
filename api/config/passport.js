const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((loggedIn, cb) => {
  cb(null, loggedIn._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false, { message: 'Usuário inválido.' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { password: 'Senha inválida.' });
      return;
    }

    next(null, foundUser);
  });
}));
