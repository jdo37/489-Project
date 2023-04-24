// in the terminal run: "npm run devStart" to start the program
// nodemon will restart the app anytime there are changes made to it and you save.
// to exit the noidemon loop, use: CTRL + C [twice] in the terminal

// Instatntiate Express
const express = require('express');
const app = express();
const sequelize = require('./db')
const session = require('express-session')
const User = require('./models/user')
const Poll = require('./models/poll')
const Answer = require('./models/answer')
const Vote = require('./models/vote');
const bcrypt = require('bcrypt')


app.use(session({
    secret: 'wsu489',
    resave: false,
    saveUnitialized: true,
    cookie: { secure: false }
}))

app.use(function(req, res, next) {
    res.locals.user = req.session.user
    next();
  });

// Set up the view engine
app.set('view engine', 'ejs');
console.log(app.get('view engine'))

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));

// Directory middleware
app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up routes using controller files
const QuestionsController = require('./controllers/QuestionsController');
app.use('/', QuestionsController);
const Login = require('./controllers/Login');
app.use('/', Login);
// Listen to requests from clients
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

async function setup() {
    pwd = "1234"

    bcrypt.hash(pwd, 10, async function(err, hash) {
        const jason = await User.create({ email: "jason@gmail.com", username: "jason", password: hash, gender: "Male", continent: "North America" })
        const tony = await User.create({ email: "tony@gmail.com", username: "tony", password: hash, gender: "Male", continent: "South America" });
        const julie = await User.create({ email: "julie@gmail.com", username: "julie", password: hash, gender: "Female", continent: "Europe" });
    
        const amy = await User.create({ email: "amy@gmail.com", username: "amy", password: hash, gender: "Female", continent: "Asia" });
        const mike = await User.create({ email: "mike@gmail.com", username: "mike", password: hash, gender: "Male", continent: "North America" });
        const hannah = await User.create({ email: "hannah@gmail.com", username: "hannah", password: hash, gender: "Female", continent: "Australia" });
        const max = await User.create({ email: "max@gmail.com", username: "max", password: hash, gender: "Male", continent: "Africa" });
        const lisa = await User.create({ email: "lisa@gmail.com", username: "lisa", password: hash, gender: "Female", continent: "Europe" });
    
    
        // Create default poll questions
        
        const poll2 = await Poll.create({ question: 'What is your favorite sport?' });
        const poll1 = await Poll.create({ question: 'What is your favorite color?' });
    
        // Create default poll answers
        const poll1Answer1 = await Answer.create({ answer: 'Red', pollId: poll1.id });
        const poll1Answer2 = await Answer.create({ answer: 'Blue', pollId: poll1.id });
        const poll1Answer3 = await Answer.create({ answer: 'Green', pollId: poll1.id });
        const poll1Answer4 = await Answer.create({ answer: 'Yellow', pollId: poll1.id });
    
    
        // Create default poll answers for second poll
        const poll2Answer1 = await Answer.create({ answer: 'Football', pollId: poll2.id });
        const poll2Answer2 = await Answer.create({ answer: 'Basketball', pollId: poll2.id });
        const poll2Answer3 = await Answer.create({ answer: 'Tennis', pollId: poll2.id });
    
        // Create default votes for poll 1
        const poll1Answer1Vote1 = await Vote.create({ userId: jason.username, pollId: poll1.id ,answerId: poll1Answer1.id });
        //const poll1Answer1Vote2 = await Vote.create({ userId: tony.username, pollId: poll1.id ,answerId: poll1Answer2.id }); // removed so that these users can vote on poll1
        //const poll1Answer1Vote3 = await Vote.create({ userId: julie.username, pollId: poll1.id ,answerId: poll1Answer1.id }); // removed so that these users can vote on poll1
        const poll1Answer1Vote4 = await Vote.create({ userId: amy.username, pollId: poll1.id ,answerId: poll1Answer3.id });
        const poll1Answer1Vote5 = await Vote.create({ userId: mike.username, pollId: poll1.id ,answerId: poll1Answer3.id });
        const poll1Answer1Vote6 = await Vote.create({ userId: hannah.username, pollId: poll1.id ,answerId: poll1Answer3.id });
        const poll1Answer1Vote7 = await Vote.create({ userId: max.username, pollId: poll1.id ,answerId: poll1Answer4.id });
        const poll1Answer1Vote8 = await Vote.create({ userId: lisa.username, pollId: poll1.id ,answerId: poll1Answer4.id });
    
        console.log(poll1.id) //  checking the id of polls 1 asnd 2
        console.log(poll2.id)
    })
   



      
}

sequelize.sync({force: true}).then(() =>{
    console.log("Sequelize Sync Complete...")
    setup().then(() => console.log("User, polls, answers and vote created"))
})