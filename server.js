// in the terminal run: "npm run devStart" to start the program
// nodemon will restart the app anytime there are changes made to it and you save.
// to exit the noidemon loop, use: CTRL + C [twice] in the terminal

// Instatntiate Express
const express = require('express');
const app = express();

// Set up the view engine
app.set('view engine', 'ejs');
console.log(app.get('view engine'))

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));

// Directory middleware
app.use(express.static(__dirname + '/public'));


// Set up routes using controller files
const QuestionsController = require('./controllers/QuestionsController');
app.use('/', QuestionsController);
const Login = require('./controllers/Login')
app.use('/', Login);
// Listen to requests from clients
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});