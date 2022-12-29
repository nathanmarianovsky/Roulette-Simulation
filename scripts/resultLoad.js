/*

Declare all of the necessary variables.

	- ipcRenderer provides the means to operate the Electron app.
	- fs and path provide the means to work with local files.

*/
const { ipcRenderer } = require("electron"),
	path = require("path"),
	fs = require("fs");



// Populate the result table once the roulette table computations have been provided.
ipcRenderer.on("resultData", (event, results) => {
	const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
	let message = document.getElementById("message"),
		messageDiv = document.createElement("div");
	message.textContent = "TOTAL BET: " + results[0][0];
	messageDiv.textContent = "The table below will provide the yield and profit for every possible roll on the Roulette table.";
	message.append(document.createElement("br"), messageDiv);
	for(var p = 1; p < results.length; p++) {
		let elemTR = document.createElement("tr"),
			elemRollTD = document.createElement("td"),
			elemOutputTD = document.createElement("td"),
			elemProfitTD = document.createElement("td");
		elemTR.classList.add("resultTableRow");
		elemRollTD.classList.add("center", "resultCell", "white-text");
		elemOutputTD.classList.add("center", "resultCell");
		elemProfitTD.classList.add("center", "resultCell");
		elemRollTD.textContent = results[p][0];
		elemOutputTD.textContent = results[p][1];
		elemProfitTD.textContent = results[p][1] - results[0][0];
		if(results[p][1] - results[0][0] > 0) {
			elemProfitTD.classList.add("black-text");
			elemProfitTD.style.backgroundColor = "lightgreen";
		}
		else {
			elemProfitTD.classList.add("white-text");
			elemProfitTD.style.backgroundColor = "indianred";
		}
		elemProfitTD.style.fontWeight = "bold";
		if(p <= 2) { elemRollTD.style.backgroundColor = "#016D29"; }
		else if(red.includes(p)) { elemRollTD.style.backgroundColor = "red"; }
		else { elemRollTD.style.backgroundColor = "black"; }
		elemTR.append(elemRollTD, elemOutputTD, elemProfitTD);
		document.getElementById("resultTable").append(elemTR);
	}
});