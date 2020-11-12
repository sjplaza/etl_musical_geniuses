// Setting the SVG height and width of chart
let svgWidth = 1000;
let svgHeight = 500;

// Setting the margins that will be used to get a chart area
let margin = {
    top: 30,
    right: 50,
    bottom: 90,
    left: 60
};

// Chart area
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group, and shift the group
let svg = d3.select('#scatter')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// Append an SVG Group - shift the group
let chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Initial Params
// Y axis is going to be Years
// X axis is going to be speechiness or it's going to be danceability
let chosenX = 'speechiness';

// Create a function that will go through and update the x_scale upon clicking on the axis label
function xScale(MusicData, chosenX) {
    // create linear scale
    let xLinearScale = d3.scaleLinear()
        .domain([0, .8])
        .range([0, width]);
    
    return xLinearScale;
}

// Function for rendering x-Axis, whenever we have a click event
function renderAxes(newXScale, xAxis) {
    let bottomAxis = d3.axisBottom(newXScale); 
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
};

// functoin used for updating the circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenX) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenX]))
    
    return circlesGroup;
};

// update the circles group with a new tooltip
function updateToolTip(chosenX, circlesGroup) {
    let label;

    if (chosenX === "speechiness") {
        label = 'Speechines Avg:'
    }
    else if (chosenX === "Danceability") {
        label = 'Danceability Avg:'
    }
    else {
        label = "Energy Avg:"
    }

    let toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`${label} ${d[chosenX]}`);
        });
    
    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
    .on("mouseout", function(data) {
        toolTip.hide(data);
    });
    return circlesGroup
}

d3.csv('./totalmusicavg.csv').then(function(MusicData) {
        console.log()

    // let parseTime = d3.timeParse("%Y")

    MusicData.forEach(function(data) {
        data.speechiness = +data.speechiness;
        data.danceability = +data.danceability;
        data.energy = +data.energy;
        data.year = +(data.year)
    });

    let xLinearScale = xScale(MusicData, chosenX);

    let yLinearScale = d3.scaleLinear()
        .domain([1920, 1949])
        .range([height, 9]);

    // just for the beginning
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    let xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(5,${height})`)
        .call(bottomAxis);
    
    // append y axis
    chartGroup.append("g")
        .call(leftAxis);
    
    // append initial circles 
    let circlesGroup = chartGroup.selectAll("circle")
        .data(MusicData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenX]))
        .attr("cy", d => yLinearScale(d.year))
        .attr("r", 6)
        .attr("fill", "purple")
        .attr("opacity", "0.9")
    
    let labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 21})`)
    
    let speechinessLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 15)
        .attr("value", "speechiness")
        .classed("active", true)
        .text("Speechiness Avg");
    
    let danceabilityLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "danceability")
        .classed("inactive", true)
        .text("Danceability Avg");

    let energyLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "energy")
        .classed("inactive", true)
        .text("Energy Avg");
    
    // Set up y axis label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Years");
    
    // updateToolTip
    circlesGroup = updateToolTip(chosenX, circlesGroup)

    labelsGroup.selectAll("text")
        .on("click", function() {
            let value = d3.select(this).attr("value");
            if (value !== chosenX) {
                chosenX = value;

                console.log(chosenX);

                xLinearScale = xScale(MusicData, chosenX);
                xAxis = renderAxes(xLinearScale, xAxis);
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenX);
                circlesGroup = updateToolTip(chosenX, circlesGroup);


                if (chosenX === "danceability") {
                    danceabilityLabel
                        .classed("active", true)
                        .classed("inactive", false);
                        speechinessLabel
                        .classed("active", false)
                        .classed("inactive", true);
                        energyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenX ==="speechiness") {
                        danceabilityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                        speechinessLabel
                        .classed("active", true)
                        .classed("inactive", false);
                        energyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    danceabilityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                        speechinessLabel
                        .classed("active", false)
                        .classed("inactive", true);
                        energyLabel
                        .classed("active", true)
                        .classed("inactive", false);
                }        
             }
            
        })
}).catch(function(error) {
    console.log(error);
})