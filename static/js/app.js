// Function to fetch data from samples.json and initiate the dashboard
function init() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Fetch the JSON data from the provided URL
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Get the sample names from the data
    var sampleNames = data.names;

    // Populate the dropdown menu with the sample names
    sampleNames.forEach((sample) => {
      dropdownMenu
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Initialize the dashboard with the first sample
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function to build the bar and bubble charts
function buildCharts(sample) {
  // Fetch the JSON data again to get the necessary data for charts
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Filter the data for the selected sample
    var selectedSample = data.samples.find(s => s.id === sample);

    // Extract necessary data for the bar chart
    var barData = [{
      type: "bar",
      x: selectedSample.sample_values.slice(0, 10).reverse(),
      y: selectedSample.otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
      text: selectedSample.otu_labels.slice(0, 10).reverse(),
      orientation: "h"
    }];

    // Create the bar chart
    Plotly.newPlot("bar", barData);

    // Extract necessary data for the bubble chart
    var bubbleData = [{
      x: selectedSample.otu_ids,
      y: selectedSample.sample_values,
      text: selectedSample.otu_labels,
      mode: "markers",
      marker: {
        size: selectedSample.sample_values,
        color: selectedSample.otu_ids
      }
    }];

    // Create the bubble chart
    Plotly.newPlot("bubble", bubbleData);
  });
}

// Function to build the metadata panel
function buildMetadata(sample) {
  // Select the panel for metadata
  var metadataPanel = d3.select("#sample-metadata");

  // Fetch the JSON data again to get the necessary metadata
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Filter the data for the selected sample
    var selectedSampleMetadata = data.metadata.find(s => s.id == sample);

    // Clear existing metadata
    metadataPanel.html("");

    // Display each key-value pair from the metadata JSON object
    Object.entries(selectedSampleMetadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  });
}

// Function to handle change in the dropdown menu
function optionChanged(newSample) {
  // Update the charts and metadata when a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
