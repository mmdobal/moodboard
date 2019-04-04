const express = require('express');

const router = express.Router();
const Picture = require('../models/Picture');

const uploader = require('../config/cloudinary');

router.post('/users/:userId', uploader.single('src'), (req, res) => {
  const { alt, naturalWidth, naturalHeight } = req.body;
  const { userId } = req.params;
  const src = req.file.url;
  const color = 'rgb(137, 175, 237)';

  const errors = {};

  if (!userId) {
    errors.hirerId = 'Obrigatório que a foto possua o id do usuário';
  }

  if (Object.keys(errors).length !== 0) {
    res.status(422).json(errors);
    return;
  }

  const newPicture = new Picture({ userId, alt, src, color, naturalHeight, naturalWidth });

  newPicture.save()
    .then((message) => {
      res.status(201).json(message);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.get('/', (req, res) => {
  Picture.find()
    .then((pictures) => {
      res.status(200).json(pictures);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: 'Insira um id de usuário válido.' });
    });
});

// Search pictures by user id
router.get('/users/:userId', (req, res) => {
  Picture.find({ userId: req.params.userId })
    .then((pictures) => {
      if (pictures.length) {
        res.status(200).json(pictures);
      } else {
        res.status(404).json({ message: 'Este usuário não postou fotos.' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: 'Insira um id de usuário válido.' });
    });
});

// Delete picture
router.delete('/:id', (req, res) => {
  Picture.deleteOne({ _id: req.params.id })
    .then((picture) => {
      res.status(204).json({ picture });
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: 'Não foi possível deletar a foto' });
    });
});

module.exports = router;
