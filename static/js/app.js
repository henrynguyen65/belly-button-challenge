// Fetch data from the provided URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to initialize the page
function init() {
  d3.json(url).then((samples) => {
    // Extract necessary data
    const samples = samples.samples;
    const samples = samples.metadata;
    const samples = samples.names;

    // Create dropdown menu with sample names
    const dropdown = d3.select("#bar-chart")
      .append("select")
      .attr("id", "selDataset")
      .on("change", updateCharts);

    dropdown.selectAll("option")
      .data(samples)
      .enter()
      .append("option")
      .text(d => d.id)
      .attr("value", d => d.id);

    // Initial charts and metadata display
    updateCharts();
  });
}

// Function to update charts and metadata
function updateCharts() {
  const dropdownMenu = d3.select("#selDataset");
  const selectedSample = dropdownMenu.property("value");

  // Get data for the selected sample
  d3.json(url).then((data) => {
    const samples = data.samples;
    const metadata = data.metadata;

    const selectedData = samples.find(sample => sample.id === selectedSample);
    const selectedMetadata = metadata.find(item => item.id === parseInt(selectedSample));

    // Update bar chart
    updateBarChart(selectedData);

    // Update bubble chart
    updateBubbleChart(selectedData);

    // Display metadata
    displayMetadata(selectedMetadata);
  });
}

// Function to update the bar chart
function updateBarChart(data) {
  // Implement your horizontal bar chart code here using D3
}

// Function to update the bubble chart
function updateBubbleChart(data) {
  // Implement your bubble chart code here using D3
}

// Function to display metadata
function displayMetadata(metadata) {
  // Implement your code to display metadata on the page
}

// Initialize the page
init();