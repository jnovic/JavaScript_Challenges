function buildMetadata(sample) {
 url = "/metadata/" + sample
 d3.json(url).then(function(response){

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  var belly = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    belly.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(response).forEach(([key,value]) =>{
      var bellybutton = belly.append("div");
      bellybutton.text(key +":" + value);
    })
  })
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
};

function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index]
  })};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
url = "/samples/" + sample

d3.json(url).then(function(response){
  console.log(response);
var test = response["sample_values"];
var maybe = response["otu_ids"];
console.log(test);
  var trace1 ={
    type: "pie",
    text: response["otu_labels"].slice(0,11),
    values: test.slice(0,11),
    labels: maybe.slice(0,11)
  }
  var data = [trace1];

  Plotly.newPlot("pie", data);

  var trace2={
  type: "scatter",
  x: response["otu_ids"],
  y: response["sample_values"],
  marker: { size: response["sample_values"],
  color: response["otu_ids"] },
  text: response["otu_labels"]
}

var data2 = [trace2];

Plotly.newPlot("bubble", data2);



});
    // @TODO: Build a Bubble Chart using the sample data


    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
 
} 

 


 

    


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();
