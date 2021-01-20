// Read in the samples.json file
// call it
d3.json("data/samples.json").then(function (data) {
  console.log(data);
  var dropDownIds = d3.select("#selDataset");
  data.names.forEach((id) => {
    dropDownIds.append("option").text(id).property("value", id);
  });
  showCharts(data.names[0]);
});
function optionChanged(id) {
  showCharts(id);
}
function showCharts(id) {
  //set place holders
  d3.json("data/samples.json").then(function (data) {
    var filterData = data.samples.filter((d) => d.id == id)[0];
    console.log(filterData);
    var names = [];
    var metadata = [];
    var samples = [];
    // Create a horizontal bar chart with a dropdown menu to display top 10 OTUS found in individual
    // 1. Use sample_values as the values for the bar chart
    var sampleValues = filterData["sample_values"];
    // 2. Use otu_ids as the labels for the bar chart
    var otu_ids = filterData["otu_ids"];
    // 3. Use otu_labels as the hovertext for the chart
    var otu_labels = filterData["otu_labels"];

    console.log(sampleValues);
    var chartData = [
      {
        x: sampleValues.slice(0, 10).reverse(),
        y: otu_ids
          .slice(0, 10)
          .map((otu) => "OTU " + otu)
          .reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      },
    ];
    var layout = {
      title: "top 10 Bacteria Cultures Found",
    };
    Plotly.newPlot("bar", chartData, layout);
    //Create a bubble chart that displays each sample.
    // 1. Use `otu_ids` for the x values.
    // 2. Use `sample_values` for the y values.
    // 3. Use `sample_values` for the marker size.
    // 4. Use `otu_ids` for the marker colors.
    // 5. Use `otu_labels` for the text values.

    chartData = [
      {
        x: otu_ids,
        y: sampleValues,
        text: otu_labels,
        marker: {
          size: sampleValues,
          color: otu_ids,
          colorscale: "Bluered",
        },
        mode: "markers",
      },
    ];
    layout = {
      title: "Bacteria Cultures per Sample",
    };
    Plotly.newPlot("bubble", chartData, layout);
    // Display the sample metadata, i.e., an individual's demographic information.
    var metaData = data.metadata.filter((d) => d.id == id)[0];
    var metaDataPanel = d3.select("#sample-metadata");

    chartData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: metaData.wfreq,
        title: {
          text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 9 },
        gauge: {
          axis: { range: [null, 9] },
          steps: [
            { range: [0, 1], color: "white" },
            { range: [1, 2], color: "yellow" },
            { range: [2, 3], color: "lightpink" },
            { range: [3, 4], color: "lightblue" },
            { range: [4, 5], color: "blue" },
            { range: [5, 6], color: "orange" },
            { range: [6, 7], color: "pink" },
            { range: [7, 8], color: "purple" },
            { range: [8, 9], color: "darkorange" },
          ],
        },
      },
    ];

    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot("gauge", chartData, layout);

    // Display each key-value pair from the metadata JSON object somewhere on the page.
    metaDataPanel.html("");
    Object.entries(metaData).forEach(([label, value]) => {
      metaDataPanel.append("h5").text(label + ": " + value);
    });

    // Update all of the plots any time that a new sample is selected.

    //Create the layout for the dashboard

    // Deployment:
    // Deploy your app to a free static page hosting service, such as GitHub Pages.

    //Advanced Challenge (Optional)
    // Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/>
    // to plot the weekly washing frequency of the individual.
    // You will need to modify the example gauge code to account for values ranging from 0 through 9.
    // Update the chart whenever a new sample is selected.
  });
}
