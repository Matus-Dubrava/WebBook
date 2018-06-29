const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const router = require('./routes.js');

const app = express();

mongoose.connect(process.env.MONGODB_URI ||
  'mongodb://localhost:27017/WebSphere');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

app.listen(app.get('port'));
