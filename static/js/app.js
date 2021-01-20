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
      title: "Top 10 Bacteria Cultures Found",
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
    //Advanced Challenge (Optional)
    // Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/>
    // to plot the weekly washing frequency of the individual.
    // You will need to modify the example gauge code to account for values ranging from 0 through 9.

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
          axis: { range: [null, 9], tick0: 0, dtick: 1 },
          steps: [
            { range: [0, 1], color: "rgb(255,0,255" },
            { range: [1, 2], color: "rgb(255,179,255" },
            { range: [2, 3], color: "rgb(255,230,255" },
            { range: [3, 4], color: "rgb(255,255,255)" },
            { range: [4, 5], color: "rgb(224,243,248)" },
            { range: [5, 6], color: "rgb(171,217,233)" },
            { range: [6, 7], color: "rgb(116,173,209)" },
            { range: [7, 8], color: "rgb(100,150,175)" },
            { range: [8, 9], color: "rgb(69,117,180)" },
          ],
        },
      },
    ];

    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot("gauge", chartData, layout);

    // Display each key-value pair from the metadata JSON object somewhere on the page.
    // Update the chart whenever a new sample is selected.
    metaDataPanel.html("");
    Object.entries(metaData).forEach(([label, value]) => {
      metaDataPanel.append("h5").text(label + ": " + value);
    });
  });
}
