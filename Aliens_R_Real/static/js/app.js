// from data.js
var tableData = data;

// YOUR CODE HERE!
var submit = d3.select("#filter-btn");
var table = d3.select("#ufo-table");
var tablebody = table.select("tbody");




function filterUFO(){
    d3.event.preventDefault();
    var inputElement =d3.select("#datetime");
    var inputValue = inputElement.property("value");
    var filteredData = tableData.filter(ufo => ufo.datetime === inputValue);
    filteredData.forEach((item) => {
        var tablerow = tablebody.append("tr");
        Object.entries(item).forEach(([key,value]) => {
            var tabledivision = tablerow.append("td");
        tabledivision.text(value);})  
    });
};

submit.on("click", filterUFO);





