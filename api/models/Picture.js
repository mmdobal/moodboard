const mongoose = require('mongoose');

const { Schema } = mongoose;

const pictureSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  alt: { type: String, min: 1 },
  color: { type: String },
  naturalHeight: { type: String },
  naturalWidth: { type: String },
  src: { type: String }
});

const Picture = mongoose.model('Picture', pictureSchema);
module.exports = Picture;
