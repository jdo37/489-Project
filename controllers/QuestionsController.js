const express = require('express');
const router = express.Router();
const { questions } = require('../models/Questions');

// Route for the main page
router.get('/', (req, res) => {
    console.log("main get function was accessed");
    const questionsLen = questions.length;
    res.render("Dashboard", {questionsLen: questionsLen})
});

// Route for the Records page
router.get('/Records', (req, res) => {
    console.log("Records page accessed");
    res.render("Records")
});

// Route for the Submit page
router.get('/Submit', (req, res) => {
    console.log("Submit question page accessed");
    res.render("SubmitQuestion")
});



// Post request from when the submit button gets pressed
router.post('/', (req, res) => {
    console.log("Post MEthod")
});

module.exports = router;
