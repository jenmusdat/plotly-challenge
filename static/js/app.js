// Read in the samples.json file
//name the .json location
var data = "/data/samples.json";
// call it
d3.json(data).then(function (data) {
  console.log(data[0]);
});

//set place holders
var names = [];
var metadata = [];
var samples = [];
// Create a horizontal bar chart with a dropdown menu to display top 10 OTUS found in individual
// 1. Use sample_values as the values for the bar chart
// 2. Use otu_ids as the labels for the bar chart
// 3. Use otu_labels as the hovertext for the chart

//Create a bubble chart that displays each sample.
// 1. Use `otu_ids` for the x values.
// 2. Use `sample_values` for the y values.
// 3. Use `sample_values` for the marker size.
// 4. Use `otu_ids` for the marker colors.
// 5. Use `otu_labels` for the text values.

// Display the sample metadata, i.e., an individual's demographic information.

// Display each key-value pair from the metadata JSON object somewhere on the page.

// Update all of the plots any time that a new sample is selected.

//Create the layout for the dashboard

// Deployment:
// Deploy your app to a free static page hosting service, such as GitHub Pages.

//Advanced Challenge (Optional)
// Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/>
// to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.
// d3.json(data / samples).then(newSuccessFunc, errorFunc);
