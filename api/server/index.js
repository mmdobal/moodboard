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

const HTTP_PORT = process.env.PORT;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(session({
  secret: 'project aluguel mjm',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://192.168.0.27:3000', 'http://192.168.0.39:3000']
}));

app.listen(HTTP_PORT, () => {
  console.log(`My server is listening on port ${HTTP_PORT}!`);
});

module.exports = app;
