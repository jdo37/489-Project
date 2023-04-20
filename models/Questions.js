const questions = [];

const question1 = {
  id: "q1",
  question: "What is your favorite color?",
  answers: [{key:'red', ansCount:0}, {key:'Blue', ansCount:0}, {key:'green', ansCount:0}]
};
const question2 = {
  id: "q2",
  question: "What is your code?",
  answers: [{key:'no', ansCount:0}, {key:'yes', ansCount:0}, {key:'maybe', ansCount:0}]
};

questions.push(question1);
questions.push(question2);

module.exports = {
  questions
};


