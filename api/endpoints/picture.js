const express = require('express');

const router = express.Router();
const PictureModel = require('../models/Picture');

const uploader = require('../config/cloudinary');

router.post('/new/:userId', uploader.single('src'), (req, res) => {
  const { alt, naturalHeight, naturalWidth } = req.body;
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

  const newPicture = new PictureModel({ userId, alt, src, naturalHeight, naturalWidth, color });

  newPicture.save()
    .then((message) => {
      res.status(201).json(message);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// Search pictures by user id
router.get('/find/:userId', (req, res) => {
  PictureModel.find({ userId: req.params.userId })
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

module.exports = router;
