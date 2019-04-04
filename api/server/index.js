require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

require('../config/passport');

const bodyParser = require('body-parser');
const connectionDb = require('../config/mongoose');

connectionDb();

const notFound = require('../middlewares/404.js');

const HTTP_PORT = process.env.PORT;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(session({
  secret: 'moodboard',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

const authRoutes = require('../endpoints/auth-routes');
const userEndpoint = require('../endpoints/user');
const pictureEndpoint = require('../endpoints/picture');

app.use('/api/auth', authRoutes);
app.use('/api/users', userEndpoint);
app.use('/api/pictures', pictureEndpoint);

app.get('*', (req, res) => notFound(req, res));


app.listen(HTTP_PORT, () => {
  console.log(`My server is listening on port ${HTTP_PORT}!`);
});

module.exports = app;
