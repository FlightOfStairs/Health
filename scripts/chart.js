$(function () {
	var charts = [ 'weight',, "bmi", "fat", "water" ];
	var targets = {
		weight : 75,
		bmi : 27.5,
		fat : 18,
		water : 55
	};

	var defaultOptions = {
		series: {
			lines: { show: true },
			points: { show: true }
		},
		xaxis: {
			mode: "time",
			timeformat: "%y-%m-%d",
			minTickSize: [1, "day"]
		}
	};

	var measurements = function(series) {
		return $.map(series, function(point) { return point[1] });
	};

	var fillChart = function (chart, data, field) {
		var series = $.map(data, function (entry) {
			return [
				[new Date(entry.date), entry[field]]
			];
		});

		var chartOptions = $.extend({}, defaultOptions);

		chartOptions.grid = { markings : [ { yaxis: { from: targets[field], to: targets[field] }, lineWidth : 1, color: "#88dd88" } ] };

		chartOptions.yaxis = {
			min : Math.min(targets[field], _.min(measurements(series))) * 0.90,
			max : Math.max(targets[field], _.max(measurements(series))) * 1.1
		};

		$.plot(chart, [series], chartOptions);
	};

	$.getJSON('data.json', function (data) {
		charts.forEach(function (chart) {
			fillChart($('#' + chart + " div.chart-placeholder"), data, chart);
		});
	})
});