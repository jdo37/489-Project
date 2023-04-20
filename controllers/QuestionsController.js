const express = require('express');
const router = express.Router();
const {questions}  = require('../models/Questions');

// Route for the main page
router.get('/', (req, res) => {
    console.log("main get function was accessed");
    const questionsLen = questions.length;
    res.render("Dashboard", {questionsLen: questionsLen})
});

// Route for the Records page
router.get('/Records', (req, res) => {
    console.log("Records page accessed");
    res.render("Records", { questions: questions});
});

// Route for the Submit page
router.get('/Submit', (req, res) => {
    console.log("Submit question page accessed");
    res.render("SubmitQuestion")
});

// POST route for submitting a question
router.post('/submitQuestion', (req, res) => {
    // Retrieve the question from the form
  const newQuestion = {
    id: `q${questions.length + 1}`,
    question: req.body.question,
    answers: []
  };

  // Iterate over the answers in the form data and create an answer object for each one
  for (let i = 0; i < req.body.answers.length; i++) {
    const answer = {
      key: req.body.answers[i],
      ansCount: 0
    };
    newQuestion.answers.push(answer);
  }

  console.log("New question added: ", newQuestion);
  // Redirect the user back to the Submit page
  res.redirect('/Submit');
  });
  

module.exports = router;

