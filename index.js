var express = require('express');
const bodyParser = require('body-parser');
const { searchController, searchAllController } = require('./search/controller');
const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//all routes
app.get('/search', searchController);
app.get('/search/all', searchAllController);


app.listen(PORT, console.log(`App listening on port ${PORT}!`));

module.exports = app;