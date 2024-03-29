const express = require('express');
const router = express.Router();
const sequelize = require('../db')
const {questions}  = require('../models/question');
const Poll = require('../models/poll');
const Answer = require('../models/answer');
const Vote = require('../models/vote');
const User = require('../models/user')
const { v4: uuidv4 } = require('uuid');



// Route for the main page
router.get('/', async (req, res) => {
    console.log("main get function was accessed");
    console.log(Poll);
    try {
        //const poll = await Poll.findOne(); // fetch the first poll
        const poll = await Poll.findOne({ order: [['createdAt', 'DESC']]}); // fetchj most recent poll

        const answers = await Answer.findAll({ where: { pollId: poll.id } }); // fetch all answers for the poll
                
        // Check if the user has already voted
        var userHasVoted = false;
        var userVoteAnswer = "no answer yet";
        var userIsSignedIn = false;

        if (req.session.user) {
          const userVote = await Vote.findOne({
            where: { pollId: poll.id, userId: req.session.user.username },
            include: { model: Answer }
          });
          if (userVote) {
            userHasVoted = true;
            userVoteAnswer = userVote.Answer.answer;
          }
          userIsSignedIn = true;
        }

        console.log(userHasVoted);
        console.log(userVoteAnswer);

        const voteData = await Vote.findAll({
            where: { pollId: poll.id },
            include: { model: Answer }
          });
          
          // extract vote counts for each answer
          const data = answers.map((answer) => ({
            answer: answer.answer,
            vote_count: voteData.filter((vote) => vote.Answer.id === answer.id).length,
          }));
          
        res.render('dashboard', { poll, data, userHasVoted, userVoteAnswer, userIsSignedIn }); // pass the poll to the dashboard view
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      }
});

router.post('/polls/:id/vote', async (req, res) => {
  const pollId = req.params.id;
  const selectedAnswer = req.body.selectedAnswer;

  console.log(selectedAnswer);
  console.log(pollId);
  console.log(req.session.user)

  try {
    // Find the answer object that matches the selected answer
    const answer = await Answer.findOne({
      where: { pollId: pollId, answer: selectedAnswer }
    });

    // Increment the vote count for the answer
    answer.vote_count++;
    await answer.save();

    // Create a new vote object in the database
    await Vote.create({
      userId: req.session.user.username,
      pollId: pollId,
      answerId: answer.id
    });

    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


// Route for the Records page
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
    const polls = await Poll.findAll({ include: Answer, order: [['createdAt', 'DESC']] });

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

router.get('/Records/:id', async function(req, res, next) {
  const poll = await Poll.findByPk(req.params.id)
  if(poll) {
    const votes = await Vote.findAll({
      where: {pollid: poll.id}
    })
    let users = []
    for (let i = 0; i < votes.length; i++) {
      var user = await User.findByPk(votes[i].userId)
      users.push(user)
    }
    const continents = ["North America", "South America", "Africa", "Europe", "Antarctica", "Asia", "Australia"]
    const genders = ["Male", "Female", "N/A"]
    const counts = []
    for (let i = 0; i < continents.length; i++) {
      counts.push(users.filter(user => user.continent === continents[i]).length)
    }
    const gcounts = []
    for (let i = 0; i < genders.length; i++) {
      gcounts.push(users.filter(user => user.gender === genders[i]).length)
    }
    console.log(counts)
    const question = {
      id: poll.id,
      question: poll.question,
      counts: counts,
      continents: continents,
      genders: genders,
      gcounts: gcounts
    }
    res.render('QuestionResults', {question})
  } else {
    res.redirect('/Records/?msg=poll+not+found&?pollid=' + req.params.pollid)
  }
})


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

