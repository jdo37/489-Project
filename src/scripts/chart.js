var xValues = ["Red", "Yellow", "Blue", "Green"];
var yValues = [20, 10, 46, 30];
var barColors = [
  "#b91d47",
  "#E6DE15",
  "#2b5797",
  "#4EAD00",
];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  }
});