const express = require('express');

const router = express.Router();
const User = require('../models/User');

const uploader = require('../config/cloudinary');

router.get('/', (req, res) => {
  User.find({})
    .then((allUsers) => {
      res.status(200).json(allUsers);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: 'Erro ao procurar usuários' });
    });
});


router.get('/:userId', (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: 'Usuário não encontrado' });
    });
});

router.delete('/:userId', (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .then((user) => {
      res.status(204).json({ user });
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: 'Usuário não encontrado' });
    });
});

router.put('/:userId', uploader.single('image'), (req, res) => {
  const { username, name, description } = req.body;

  if (req.file === undefined) {
    User.findOneAndUpdate({ _id: req.params.userId }, { username, name, description })
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: 'Usuário não encontrado' });
      });
  } else {
    User.findOneAndUpdate({ _id: req.params.userId }, { username, name, description, pathPicture: req.file.url })
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: 'Usuário não encontrado' });
      });
  }
});

module.exports = router;
