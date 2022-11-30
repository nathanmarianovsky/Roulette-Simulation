/*

Declare all of the necessary variables.

	- ipcRenderer provides the means to operate the Electron app.
	- fs and path provide the means to work with local files.

*/
const { ipcRenderer } = require("electron"),
	path = require("path"),
	fs = require("fs"),
	$ = require("jquery");



ipcRenderer.on("resultData", (event, results) => {
	const messageText = "The table below will provide the yield and profit for every possible roll on the Roulette table.";
	$("#message").text("TOTAL BET: " + results[0][0]).append($("<br>"), $("<div>").text(messageText));
	const red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
	for(var p = 1; p < results.length; p++) {
		var elemTR = $("<tr>").addClass("resultTableRow"),
			elemRollTD = $("<td>").text(results[p][0]).addClass("center resultCell white-text"),
			elemOutputTD = $("<td>").text(results[p][1]).addClass("center resultCell"),
			elemProfitTD = $("<td>").text(results[p][1] - results[0][0]).addClass("center resultCell");
		results[p][1] - results[0][0] > 0 ? elemProfitTD.addClass("black-text")
			.css({"background-color": "lightgreen", "font-weight": "bold"})
			: elemProfitTD.addClass("white-text")
			.css({"background-color": "indianred", "font-weight": "bold"});
		if(p <= 2) { elemRollTD.css("background-color", "#016D29"); }
		else if(red.includes(p)) {
			elemRollTD.css("background-color", "red");
		}
		else {
			elemRollTD.css("background-color", "black");
		}
		elemTR.append(elemRollTD, elemOutputTD, elemProfitTD);
		$("#resultTable").append(elemTR);
	}
});