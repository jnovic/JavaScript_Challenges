// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area

  
d3.csv("assets/data/data.csv"). then( function(healthData, error) {
console.log(healthData);
    // Cast each hours value in tvData as a number using the unary + operator
    healthData.forEach(function(data) {
      data.abbr = data.abbr;
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      console.log("State:", data.state);
      console.log("Poverty:", data.poverty);
      console.log("Uninsured:", data.healthcare);
    });
    
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
    
    // Select body, append SVG area to it, and set the dimensions
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
    
    // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
    // to the margins set in the "chartMargin" object.
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);  
  var xScale = d3.scaleLinear()
  .domain([0, d3.max(healthData, d => d.poverty)])
  .range([0, chartWidth]);

  var yScale = d3.scaleLinear()
  .domain([0, d3.max(healthData, d => d.healthcare)])
  .range([0, chartHeight]);

  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis);

  // Add leftAxis to the left side of the display
  chartGroup.append("g").call(leftAxis);
  var circles = chartGroup.selectAll("g chartData").data(healthData).enter();
  var circlesGroup = circles
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "15")
    .attr("fill","#89bdd3")
    .attr("opacity", ".5");

    var circlesGroup = circles
    .append("text")
    .attr("x", d => xScale(d.poverty) - 12)
    .attr("y", d => yScale(d.healthcare))
    .text(d => d.abbr);

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left + 40)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("% x");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
      .attr("class", "axisText")
      .text("%y");

      if (error) return console.warn(error);
  
    console.log(healthData);
  });
