let graphContainer = d3.select('.graph_container')

let map = d3.map(journalData, function(d) {
  return console.log("this is the data", d)

})


//code to viz the graph
let graphData = d3.select('.graph_data')
  .append('svg')
  .attr('width', 900)
  .attr('height', 600)

let mainCircle = graphData.append('circle')
  .attr('cx', 450)
  .attr('cy', 300)
  .attr('r', 220)
  .style('fill', '#f9a346')