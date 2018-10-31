// from data.js
var tableData = data;

// YOUR CODE HERE!
var submit = d3.select("#filter-btn");
var table = d3.select("#ufo-table");
var tablebody = table.select("tbody");

console.log(Object.entries(tableData));
tableData.forEach((user) => {
    var tablerow = tablebody.append("tr");
    Object.entries(user).forEach(([key,value]) => {
        var tabledivision = tablerow.append("td");
    tabledivision.text(value);})  
});



