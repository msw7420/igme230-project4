// Variable declaration
var margin = {top: 10, bottom: 10, left: 10, right: 10};
var width = Math.max(900, innerWidth);
var height = Math.max(700, innerHeight);
var numColors = 1000;

// Create svg
var svg = d3.select('.container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .on('click', svgClicked);

// Create a scale for the colors
var scaleColor = d3.scaleLinear()
  .domain([0, width])
  .range(d3.schemeCategory10)
  .interpolate(d3.interpolateHcl);

function callBack() {
  // Loop over every circle
  d3.selectAll('circle')
    .each(function(d) {
      // Get current circle
      var element = d3.select(this);

      // Get attributes
      var cx = element.attr('cx');
      var transform = element.attr('transform');
      var transformValues = transform.match(/translate\((.*), (.*)\)/);

      // Calculate x value
      var x = transformValues[1];

      element
        .attr('fill', function() {
          // console.log(parseFloat(cx) + parseFloat(x));
          return scaleColor(parseFloat(cx) + parseFloat(x));
        });
    });
}


function svgClicked() {

  // Remove last circles
  d3.selectAll('circle').remove();

  // Get mouse coordinates
  var mouse = d3.mouse(this);

  // Create many bubbles
  for (var i = 0; i < Math.floor(Math.random() * 2000) + 1; i++) {

    // Create random numbers for translation of circles
    var randomNumber = Math.floor((Math.random() < 0.5 ? -1 : 1) * Math.random() * 600);
    var randomNumber2 = Math.floor((Math.random() < 0.5 ? -1 : 1) * Math.random() * 600);

    // Create circles
    svg.append('circle')
      .attr('cx', mouse[0])
      .attr('cy', mouse[1])
      .attr('r', Math.random() * 30)
      .attr('fill', '#fff')
      .transition()
      .duration(1000)
        .attr('transform', 'translate(' +  randomNumber +
          ',' + randomNumber2 + ')')
        .attr('opacity', Math.random())
        .on('end', callBack);
  }
}