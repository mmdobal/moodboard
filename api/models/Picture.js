const mongoose = require('mongoose');

const { Schema } = mongoose;

const pictureSchema = new Schema({
  alt: { type: String, min: 1 },
  color: 'rgb(137, 175, 237)',
  naturalHeight: { type: Number },
  naturalWidth: { type: Number },
  src: { type: String }
});

const Picture = mongoose.model('Picture', pictureSchema);
module.exports = Picture;
