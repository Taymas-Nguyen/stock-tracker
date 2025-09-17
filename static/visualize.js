function drawLine(color, range){
var csv_page;
var time_format;

var past_date = new Date();

if (range == "1 Day"){
  csv_page = "../csv_page_minute";
  past_date.setDate(past_date.getDate() - 1)
}
if (range == "5 Days"){
  csv_page = "../csv_page_minute";
  past_date.setDate(past_date.getDate() - 7)
}
if (range == "1 Month"){
  csv_page = "../csv_page_max";
  past_date.setDate(past_date.getDate() - 30)
}
if (range == "6 Months"){
  csv_page = "../csv_page_max";
  past_date.setDate(past_date.getDate() - 185)
}
if (range == "Year to Date"){
  csv_page = "../csv_page_max";
  past_date = new Date(new Date().getFullYear(), 0, 1);

}
if (range == "1 Year"){
  csv_page = "../csv_page_max";
  past_date.setDate(past_date.getDate() - 366)
}
if (range == "5 Years"){
  csv_page = "../csv_page_max";
  past_date.setDate(past_date.getDate() - 366*5)
}
if (range == "Max"){
  csv_page = "../csv_page_max";
}

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1150 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#line_graph")
  .append("svg")
    .attr("id", "svgid")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);  
//Read the data
d3.csv(csv_page,

  function(d){
    // todo: change time format based on ranges
    data_date = new Date(d.date)
    if (data_date > past_date || range == "Max"){
      return { date : d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date), value : d.value }
    }
  }).then(

  function(data) {

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y %b %d"))); // time format 

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return +d.value; }), d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})

}

function removeSVG(){
  const a = d3.select("#svgid").remove();
}