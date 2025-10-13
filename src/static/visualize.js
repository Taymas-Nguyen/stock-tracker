function drawLine(color, range, request_type){

var csv_page;
var time_format = "%Y %b";

// d3.js sends fetch request to cvs page
// default fetch is to change range
if (request_type == null){
  request_type = "searchTicker";
}

var past_date = new Date();
// 5 days shows 7 days, this is intended
if (range == "1 Day"){
  csv_page = "../csv_page_minute";
  past_date.setDate(past_date.getDate() - 1)
  time_format = "%b %d %H:%M";
}
if (range == "5 Days"){
  csv_page = "../csv_page_minute";
  past_date.setDate(past_date.getDate() - 7)
  time_format = "%b %d %H:%M";
}
if (range == "1 Month"){
  csv_page = "../csv_page_max";
  past_date.setDate(past_date.getDate() - 31)
  time_format = "%b";
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
d3.csv(csv_page, {

    headers: new Headers({
      "requestType": request_type,
    })
  },

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
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat(time_format))); // time format 

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




    // start of tooltip

  const circle = svg.append("circle")
    .attr("r", 0)
    .attr("fill", "steelblue")
    .style("stroke", "white")
    .attr("opacity", .70)
    .style("pointer-events", "none");

    const listeningRect = svg.append("rect")
    .attr("width", width)
    .attr("height", height);
    
                const tooltip = d3.select("#tooltip")
  .append("div")
  .attr("class", "tooltip");

    listeningRect.on("mousemove", function (event) {

    const [xCoord] = d3.pointer(event, this);
    const bisectDate = d3.bisector(d => d.date).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    const xPos = x(d.date);
    const yPos = y(d.value);
    
            circle.transition()
      .duration(50)
      .attr("r", 5);

    circle.attr("cx", xPos)
      .attr("cy", yPos);

      
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour12: false // Set to true for 12-hour format with AM/PM, false for 24-hour format
});

    tooltip
      .style("display", "block")
      .style("left", xPos + 65)
      .style("top", yPos + 45)
      .html(`${formatter.format(d.date)} <br> ${d.value}`);
      });
    // Update the circle position


      
        listeningRect.on("mouseleave", function () {
    circle.transition()
      .duration(50)
      .attr("r", 0);

    tooltip.style("display", "none");
  });


      // end of tooltip

    // when svg is done rendering, enable buttons and hide loading screen
    document.getElementById('loading_graph').style.display = 'none';
    for( i=0; i< childDivs.length; i++ )
      { 
          childDivs[i].disabled = false;
      }

})

}

function removeSVG(){
  const a = d3.select("#svgid").remove();
}