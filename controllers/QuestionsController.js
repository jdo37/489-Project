const express = require('express');
const router = express.Router();
const sequelize = require('../db')
const {questions}  = require('../models/question');
const Poll = require('../models/poll');
const Answer = require('../models/answer');
const Vote = require('../models/vote');
const { v4: uuidv4 } = require('uuid');



// Route for the main page
router.get('/', async (req, res) => {
    console.log("main get function was accessed");
    console.log(Poll);
    try {
        const poll = await Poll.findOne(); // fetch the first poll
        const answers = await Answer.findAll({ where: { pollId: poll.id } }); // fetch all answers for the poll
        const voteData = await Vote.findAll({
            where: { pollId: poll.id },
            include: { model: Answer }
          });
          
          // extract vote counts for each answer
          const data = answers.map((answer) => ({
            answer: answer.answer,
            vote_count: voteData.filter((vote) => vote.Answer.id === answer.id).length,
          }));
          
        res.render('dashboard', { poll, data }); // pass the poll to the dashboard view
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      }
});

// Route handler for /Records endpoint
/*
router.get('/Records', async (req, res) => {
  try {
    console.log("in record BE");
    // Fetch all the polls from the database
    const polls = await Poll.findAll({ include: Answer });

    // Create an array to hold the questions and answers
    const questions = [];

    // Loop through each poll and extract the question and associated answers
    polls.forEach(poll => {
      const question = {
        id: poll.id,
        question: poll.question,
        answers: poll.Answers.map(answer => answer.answer)
      };
      questions.push(question);
      console.log("logging data BE req:",question);
    });

    // Render the Records page and pass the questions array as a parameter
    res.render('Records', { questions });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the questions.');
  }
});
*/
// Route for the Records page
router.get('/Records', async (req, res) => {
  try {
    console.log("in record BE");
    // Fetch all the polls from the database
    const polls = await Poll.findAll({ include: Answer });

    // Create an array to hold the questions and answers
    const questions = [];

    // Loop through each poll and extract the question and associated answers
    for (let i = 0; i < polls.length; i++) {
      const poll = polls[i];
      const answers = await Answer.findAll({ where: { pollId: poll.id } }); // fetch all answers for the poll
      const voteData = await Vote.findAll({
        where: { pollId: poll.id },
        include: { model: Answer }
      });
      // extract vote counts for each answer
      const voteCounts = answers.map(answer => ({
        answer: answer.answer,
        vote_count: voteData.filter(vote => vote.Answer.id === answer.id).length
      }));
    
      const question = {
        id: poll.id,
        question: poll.question,
        answers: voteCounts.map(voteCount => voteCount.answer),
        vote_counts: voteCounts.map(voteCount => voteCount.vote_count)
      };
      questions.push(question);
      console.log("logging data BE req:", question);
    }

    // Render the Records page and pass the questions array as a parameter
    res.render('Records', { questions });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the questions.');
  }
});




// Route for the Submit page
router.get('/Submit', (req, res) => {
    console.log("Submit question page accessed");
    res.render("SubmitQuestion")
});

// POST route for submitting a question
router.post("/submitQuestion", async (req, res) => {
  try {
    console.log("im backend, putting new poll in database!");

    const question = req.body.question;
    const answers = req.body.answers;
    const pollId = uuidv4(); // generate a unique ID for the question using uuidv4
  
    console.log("Question for be:", question);
    console.log("Answers for be:", answers);
  
    console.log("here is the data in backend i got: ",req.body);

    const poll = await Poll.create({ question, pollId }); // create a new poll with the question and the unique ID
    console.log("New poll created:", poll);

    // loop through the answers and create a new Answer object for each one, with the pollId set to the ID of the new poll
    for (const answer of answers) {
      const newAnswer = await Answer.create({ answer, pollId: poll.id });
      console.log("New answer created:", newAnswer);
    }

    res.redirect("/Records");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while submitting the question.");
  }
});


  

module.exports = router;

