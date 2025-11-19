function drawLine(color, range, topDivName){
  var csv_page;
  var time_format;
  var range_tooltip_format;
  var past_date = new Date();
  
  // 5 days shows 7 days, this is intended
  if (range == "1Day"){
    csv_page = "minute";
    past_date.setDate(past_date.getDate() - 1)
    time_format = "%b %d %H:%M";
    range_tooltip_format = {
      month: 'short',
      day: '2-digit',
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }
  }
  if (range == "5Days"){
    csv_page = "minute";
    past_date.setDate(past_date.getDate() - 7)
    time_format = "%b %d %H:%M";
    range_tooltip_format = {
      month: 'short',
      day: '2-digit',
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }
  }
  if (range == "1Month"){
    csv_page = "max";
    past_date.setDate(past_date.getDate() - 31)
    time_format = "%b %d";
    range_tooltip_format = {
      month: 'short',
      day: '2-digit',
    }
  }
  if (range == "6Months"){
    csv_page = "max";
    past_date.setDate(past_date.getDate() - 185)
    time_format = "%Y %b %d";
    range_tooltip_format = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }
  }
  if (range == "YearToDate"){
    csv_page = "max";
    past_date = new Date(new Date().getFullYear(), 0, 1);
    time_format = "%Y %b";
    range_tooltip_format = {
      month: 'short',
      day: '2-digit',
    }
  }
  if (range == "1Year"){
    csv_page = "max";
    past_date.setDate(past_date.getDate() - 366)
    time_format = "%Y %b";
    range_tooltip_format = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }
  }
  if (range == "5Years"){
    csv_page = "max";
    past_date.setDate(past_date.getDate() - 366*5)
    time_format = "%Y %b";
    range_tooltip_format = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }
  }
  if (range == "Max"){
    csv_page = "max";
    time_format = "%Y %b";
    range_tooltip_format = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }
  }

  // set the dimensions and margins of the graph
  var scale = 1;
  const margin = {top: 10, right: 30, bottom: 30, left: 60};
  const width = 1150/scale
  const height = 400/scale

  // append the svg object to line graph of top div with unique id
  const svg = d3
    .select(`#${topDivName}-line_graph`)
    .append("svg")
    .attr("id", `${topDivName}-svgid`)
    .attr("viewBox", "0 0 1150 450")
    // .attr("width", width)
    // .attr("height", height + 100)
    // .attr("width", "100%")
    // .attr("height", "100%")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);  


  //Read the data
  d3.csv(csv_page + topDivName[topDivName.length - 1], 

  function(d){
    // todo: change time format based on ranges
    data_date = new Date(d.date)
    if (data_date > past_date || range == "Max"){
      return { date : d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date), value : d.value }
    }
  }).then(
    function(data){
      // Add X axis --> it is a date format
      const x = d3 
        .scaleTime()
        .domain(d3.extent(data, function(d) { 
          return d.date; }))
        .range([ 0, width ]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat(time_format))); // time format 

      // Add Y axis
      const y = d3 
        .scaleLinear()
        .domain([d3.min(data, function(d) { return +d.value; }), d3.max(data, function(d) { return +d.value; })])
        .range([ height, 0 ]);
      svg
        .append("g")
        .call(d3.axisLeft(y));

      // Add the line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) }))

      // start of tooltip
      const circle = svg
        .append("circle")
        .attr("r", 0)
        .attr("fill", "steelblue")
        .style("stroke", "white")
        .attr("opacity", .70)
        .style("pointer-events", "none");

      const listeningRect = svg
        .append("rect")
        .attr("width", width)
        .attr("height", height);

      const tooltip = d3
        .select(`#${topDivName}-tooltip`)
        .append("div")
        .attr("class", "tooltip");

      listeningRect.on("mousemove", function (event){
          const [xCoord] = d3.pointer(event, this);
          const bisectDate = d3.bisector(d => d.date).left;
          const x0 = x.invert(xCoord);
          const i = bisectDate(data, x0, 1);
          const d0 = data[i - 1];
          const d1 = data[i];
          const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
          const xPos = x(d.date);
          const yPos = y(d.value);
          
          circle
            .transition()
            .duration(50)
            .attr("r", 5)
            .attr("cx", xPos)
            .attr("cy", yPos);

          const formatter = new Intl.DateTimeFormat('en-US', range_tooltip_format);

          tooltip
            .style("display", "block")
            .style("left", xPos + 1)
            .style("top", yPos + 1)
            .html(`${formatter.format(d.date)} <br> ${d.value}`);
        }
      );

      listeningRect.on("mouseleave", function () {
          circle
            .transition()
            .duration(50)
            .attr("r", 0);
          tooltip
            .style("display", "none");
        }
      );
      // end of tooltip

      // when svg is done rendering, enable buttons and hide loading screen
      topDiv = document.getElementById(topDivName)
      range_buttons = topDiv.querySelectorAll('button');
      for( i=0; i< range_buttons.length; i++ )
      {
        range_buttons[i].disabled = false;
      }
      topDiv.querySelector(`#${topDivName}-loading_graph`).style.display = 'none';
    }
  )
}

function removeSVG(topDivName){
  d3.select(`#${topDivName}-svgid`).remove();
}