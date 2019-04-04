const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authRoutes = express.Router();


authRoutes.post('/signup', (req, res) => {
  const { username, password, name } = req.body;
  console.log(username, password, name);
  const errors = {};

  if (!name) {
    errors.name = 'Digite o nome';
  }

  if (username.length < 6) {
    errors.username = 'O seu email deve ter no mínimo 6 caracteres';
  }

  if (password.length < 7) {
    errors.password = 'A sua senha deve ter no mínimo 7 caracteres';
  }

  if (Object.keys(errors).length !== 0) {
    res.status(422).json(errors);
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: 'Não foi possível buscar pelo email' });
      return;
    }

    if (foundUser) {
      res.status(409).json({ username: 'Este email já está em uso. Tente outro.' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      name,
      username,
      password: hashPass
    });

    aNewUser.save((error) => {
      if (error) {
        res.status(400).json({ message: 'Erro ao salvar usuário no banco de dados.' });
        return;
      }

      req.login(aNewUser, (er) => {
        if (er) {
          res.status(500).json({ message: 'Não foi possível logar após o cadastro.' });
          return;
        }

        res.status(200).json(aNewUser);
      });
    });
  });
});


authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (er) => {
      if (er) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }

      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'O usuário foi deslogado!' });
});

authRoutes.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Não autorizado!' });
});

module.exports = authRoutes;
