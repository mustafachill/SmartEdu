// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');


// EXPRESS
const app = express();

//CONNECT TO DB
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log('DB Connected Successfuly');
  });

// TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// MIDDLEWARES
app.use(express.static('public'));

// ROUTE
app.use('/', pageRoute);
app.use('/courses', courseRoute);

// PORT
const port = 3000;
app.listen(port, () => {
  console.log(`App started on ${port}`);
});
