$(function () {
    var charts = ["weight", "bmi", "fat", "water"];

    var options = {
        series : {
            lines : { show: true },
            points : { show: true }
        },
        grid : {
            hoverable : true,
            clickable : true
        },
        xaxis : {
            mode : "time",
            timeformat : "%y-%m-%d",
            minTickSize : [1, "day"]
        }
    };

    var fillChart = function(chart, data, field) {
        var series = $.map(data, function(entry) {
            return [[new Date(entry.date), entry[field]]];
        });
        $.plot(chart, [series], options);
    }

    $.getJSON('data.json', function(data) {
        charts.forEach(function(chart) {
            fillChart(document.getElementById(chart), data, chart);
        });
    })
});