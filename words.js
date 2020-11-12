// Encapsulate the word cloud functionality
function wordCloud(selector) {

    var fill = d3.scale.category20();

    //Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        .attr("width", 700)
        .attr("height", 700)
        .append("g")
        .attr("transform", "translate(250,250)");


    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
            .data(words, function (d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function (d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function (d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
            .duration(600)
            .style("font-size", function (d) { return d.size + "px"; })
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
            .duration(200)
            .style('fill-opacity', 1e-6)
            .attr('font-size', 1)
            .remove();
    }

    return {

        update: function (words) {
            d3.layout.cloud().size([500, 500])
                .words(words)
                .padding(5)
                .rotate(function () { return ~~(Math.random() * 2) * 45; })
                .font("Impact")
                .fontSize(function (d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

var words = [
    "acousticness: measures from 0.0 to 1.0 where 1.0 represents high confidence the track is acoustic", "danceability: how suitable a track is for dancing with 1.0 being the most danceable", "energy: measures from 0.0 to 1.0; typically, energetic tracks feel fast, loud, and noisy", "instrumentalness: measures from 0.0 to 1.0 which predicts whether a track contains no vocals", "loudness: typical range between - 60 and 0 dB", "speechiness: measures from 0.0 to 1.0 and detects the presence of spoken words in a track", "tempo: overall estimated speed or pace of a track in beats per minute", "valence: measures from 0.0 to 1.0 describing the musical positiveness conveyed by a track",
]

function getWords(i) {
    return words[i]
        .replace(/[!\,\?]/g, '')
        .split(' ')
        .map(function (d) {
            return { text: d, size: 10 + Math.random() * 60 };
        })
}

function showNewWords(vis, i) {
    i = i || 0;

    vis.update(getWords(i++ % words.length))
    setTimeout(function () { showNewWords(vis, i + 1) }, 2000)
}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('body');

//Start cycling through the demo data
showNewWords(myWordCloud);