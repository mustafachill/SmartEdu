// IMPORTS
const express = require('express');

// EXPRESS
const app = express();

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
});

app.get('/about', (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
});

// PORT
const port = 3000;
app.listen(port, () => {
  console.log(`App started on ${port}`);
});
