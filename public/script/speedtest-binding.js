/*global ko, d3*/

ko.bindingHandlers.speedtest = {
    init: function(element) {
        "use strict";

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            elementWidth = parseInt(d3.select(element).style("width"), 10),
            elementHeight = parseInt(d3.select(element).style("height"), 10),
            width = elementWidth - margin.left - margin.right,
            height = elementHeight - margin.top - margin.bottom,
            svg;

        svg = d3.select(element).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")");

        svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Mbits/s");

        svg.append("path")
            .attr("class", "line download");

        svg.append("path")
            .attr("class", "line upload");
    },
    update: function(element, valueAccessor) {
        "use strict";

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            elementWidth = parseInt(d3.select(element).style("width"), 10),
            elementHeight = parseInt(d3.select(element).style("height"), 10),
            width = elementWidth - margin.left - margin.right,
            height = elementHeight - margin.top - margin.bottom,

            x = d3.time.scale()
                .range([0, width]),

            y = d3.scale.linear()
                .range([height, 0]),

            xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom"),

            yAxis = d3.svg.axis()
                .scale(y)
                .orient("left"),

            downloadLine = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.download); }),

            uploadLine = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.upload); }),

            svg = d3.select(element).select("svg g"),

            data = ko.unwrap(valueAccessor());

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.download; })]);

        svg.select("g.x.axis")
            .call(xAxis);

        svg.select("g.y.axis")
            .call(yAxis);

        svg.select("path.line.download")
            .datum(data)
            .attr("d", downloadLine);

        svg.select("path.line.upload")
            .datum(data)
            .attr("d", uploadLine);
    }
};
