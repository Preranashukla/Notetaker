// dependencies
const express = require('express');
const path = require('path');
// Route files
// const apiRoutes = require('./routes/apiRoutes');
// const indexRoutes = require('./routes/indexRoutes');
const api = require('./routes/index.js');

// Set port
const PORT = process.env.PORT || 3001;

//initialize express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

//Get Route for homepage
// app.use('/api', apiRoutes);
// app.use('/', indexRoutes);
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

//Route for note page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

//Route to redirect to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);



//App Listener
app.listen(PORT, () =>
  console.log(`App listening at localhost:${PORT}`)
);