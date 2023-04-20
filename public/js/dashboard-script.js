var xValues = [<% for (let i = 0; i < answers.length; i++) { %>  "<%= answers[i].answer %>",      <% } %>];

var yValues = [<% for (let i = 0; i < answers.length; i++) { %>  <%= answers[i].vote_count == 0 ? -1 : answers[i].vote_count %>,
      <% } %>];

var barColors = ["#b91d47", "#2b5797", "#00aba9", "#e8c3b9", "#1e7145"];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "<%= poll.question %>",
    },
  },
});

// NOT WORKING