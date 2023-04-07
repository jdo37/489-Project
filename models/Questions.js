const questions = [];

const question1 = {
  id: "q1",
  question: "What is your favorite color?",
  answers: ["Red", "Blue", "Green"]
};

const question2 = {
  id: "q2",
  question: "What is your favorite food?",
  answers: ["Pizza", "Burgers", "Sushi"]
};

questions.push(question1);
questions.push(question2);

module.exports = {
  questions
};