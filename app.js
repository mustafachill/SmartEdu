// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');

// EXPRESS
const app = express();

//CONNECT TO DB
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB Connected Successfuly');
  });

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

// ROUTE
app.use('/', pageRoute);

// PORT
const port = 3000;
app.listen(port, () => {
  console.log(`App started on ${port}`);
});
