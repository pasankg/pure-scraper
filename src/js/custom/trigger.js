// Script to render tables and charts.
function renderTables() {
 console.log('Render tables and pie.');

 // Create DataTable
 const table = new DataTable("#trend-table", {
  order: [[1, 'desc']]
 });
 new DataTable("#keyword-table", {
  order: [[1, 'desc']]
 });

 new DataTable("#news-table");

 // Create chart
 const chart = Highcharts.chart("trend-pie", {
  chart: {
   type: "pie",
   styledMode: true,
  },
  title: {
   text: "Trends",
  },
  series: [
   {
    data: chartData(table),
   },
  ],
 });

 // On each draw, update the data in the chart
 table.on("draw", function () {
  chart.series[0].setData(chartData(table));
 });

 function chartData(table) {
  let trendNames = {};
  let trendCount = {};

  // Count the number of entries for each position
  table
   .column(0, { search: "applied" })
   .data()
   .each(function (val, index) {
    trendNames[index] = val;
   });

  table
   .column(1, { search: "applied" })
   .data()
   .each(function (val, index) {
    trendCount[trendNames[index]] = val;
   });

  return Object.entries(trendCount).map((e) => ({
   name: e[0],
   y: parseInt(e[1]),
  }));
 }
}