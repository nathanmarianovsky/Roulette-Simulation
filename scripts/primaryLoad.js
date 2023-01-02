/*

Declare all of the necessary variables.

	- ipcRenderer provides the means to operate the Electron app.
	- fs and path provide the means to work with local files.

*/
const { ipcRenderer } = require("electron"),
	path = require("path"),
	fs = require("fs"),
	$ = require("jquery");



/*

Provides an object representing all possible bet arrays.

*/
var betArrays = () => {
	// Define arrays for all roulette table bets. 
	let splitBets = new Array(58).fill(0),
		lineBets = new Array(13).fill(0),
		streetBets = new Array(12).fill(0),
		cornerBets = new Array(22).fill(0),
		singleBets = new Array(38).fill(0),
		dozenBets = new Array(3).fill(0),
		halfBets = new Array(2).fill(0),
		columnBets = new Array(3).fill(0),
		parityBets = new Array(2).fill(0),
		colorBets = new Array(2).fill(0);
	// Define the roulette table dozens, columns, and colors.
	let dozen1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		dozen2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		dozen3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
		col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
		col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
		col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
		red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
	// Define the roulette table lines.
	let lines = {
		"line2": [1, 2, 3, 4, 5, 6],
		"line3": [4, 5, 6, 7, 8, 9],
		"line4": [7, 8, 9, 10, 11, 12],
		"line5": [10, 11, 12, 13, 14, 15],
		"line6": [13, 14, 15, 16, 17, 18],
		"line7": [16, 17, 18, 19, 20, 21],
		"line8": [19, 20, 21, 22, 23, 24],
		"line9": [22, 23, 24, 25, 26, 27],
		"line10": [25, 26, 27, 28, 29, 30],
		"line11": [28, 29, 30, 31, 32, 33],
		"line12": [31, 32, 33, 34, 35, 36]
	};
	// Define the roulette table streets.
	let streets = {
		"street1": [1, 2, 3],
		"street2": [4, 5, 6],
		"street3": [7, 8, 9],
		"street4": [10, 11, 12],
		"street5": [13, 14, 15],
		"street6": [16, 17, 18],
		"street7": [19, 20, 21],
		"street8": [22, 23, 24],
		"street9": [25, 26, 27],
		"street10": [28, 29, 30],
		"street11": [31, 32, 33],
		"street12": [34, 35, 36]
	};
	// Define the roulette table splits.
	let splits = {
		"split1": [3, 6],
		"split2": [6, 9],
		"split3": [9, 12],
		"split4": [12, 15],
		"split5": [15, 18],
		"split6": [18, 21],
		"split7": [21, 24],
		"split8": [24, 27],
		"split9": [27, 30],
		"split10": [30, 33],
		"split11": [33, 36],
		"split12": [2, 5],
		"split13": [5, 8],
		"split14": [8, 11],
		"split15": [11, 14],
		"split16": [14, 17],
		"split17": [17, 20],
		"split18": [20, 23],
		"split19": [23, 26],
		"split20": [26, 29],
		"split21": [29, 32],
		"split22": [32, 35],
		"split23": [1, 4],
		"split24": [4, 7],
		"split25": [7, 10],
		"split26": [10, 13],
		"split27": [13, 16],
		"split28": [16, 19],
		"split29": [19, 22],
		"split30": [22, 25],
		"split31": [25, 28],
		"split32": [28, 31],
		"split33": [31, 34],
		"split34": [2, 3],
		"split35": [1, 2],
		"split36": [5, 6],
		"split37": [4, 5],
		"split38": [8, 9],
		"split39": [7, 8],
		"split40": [11, 12],
		"split41": [10, 11],
		"split42": [14, 15],
		"split43": [13, 14],
		"split44": [17, 18],
		"split45": [16, 17],
		"split46": [20, 21],
		"split47": [19, 20],
		"split48": [23, 24],
		"split49": [22, 23],
		"split50": [26, 27],
		"split51": [25, 26],
		"split52": [29, 30],
		"split53": [28, 29],
		"split54": [32, 33],
		"split55": [31, 32],
		"split56": [35, 36],
		"split57": [34, 35]
	};
	// Define the roulette table corners.
	let corners = {
		"corner1": [2, 3, 5, 6],
		"corner2": [5, 6, 8, 9],
		"corner3": [8, 9, 11, 12],
		"corner4": [11, 12, 14, 15],
		"corner5": [14, 15, 17, 18],
		"corner6": [17, 18, 20, 21],
		"corner7": [20, 21, 23, 24],
		"corner8": [23, 24, 26, 27],
		"corner9": [26, 27, 29, 30],
		"corner10": [29, 30, 32, 33],
		"corner11": [32, 33, 35, 36],
		"corner12": [1, 2, 4, 5],
		"corner13": [4, 5, 7, 8],
		"corner14": [7, 8, 10, 11],
		"corner15": [10, 11, 13, 14],
		"corner16": [13, 14, 16, 17],
		"corner17": [16, 17, 19, 20],
		"corner18": [19, 20, 22, 23],
		"corner19": [22, 23, 25, 26],
		"corner20": [25, 26, 28, 29],
		"corner21": [28, 29, 31, 32],
		"corner22": [31, 32, 34, 35]
	};
	// Return an object consisting of arrays representing all roulette table bets.
	return {
		"splitBets": splitBets,
		"lineBets": lineBets,
		"streetBets": streetBets,
		"cornerBets": cornerBets,
		"singleBets": singleBets,
		"dozenBets": dozenBets,
		"halfBets": halfBets,
		"columnBets": columnBets,
		"parityBets": parityBets,
		"colorBets": colorBets,
		"dozen1": dozen1,
		"dozen2": dozen2,
		"dozen3": dozen3,
		"col1": col1,
		"col2": col2,
		"col3": col3,
		"red": red,
		"lines": lines,
		"streets": streets,
		"splits": splits,
		"corners": corners
	};
};



/*

Handles the placement of markers for all corners, lines, splits, and streets.

	- xShift is the distance by which the markers have to be shifted in the horizontal direction.
	- yShift is the distance by which the markers have to be shifted in the vertical direction.

*/
var markerPlacement = (xShift, yShift) => {
	// Position all corner, line, split, and street markers.
	for(let i = 1; i < 59; i++) {
		let str = "",
			width = "",
			heightInt = "",
			widthInt = "";
		if(i == 1) {
			let streetCell = document.getElementById("streetCell1"),
				streetLink = document.getElementById("streetLink1"),
				lineLink = document.getElementById("lineLink1"),
				rect = streetCell.getBoundingClientRect(),
				offset = { "top": rect.top + window.scrollY, "left": rect.left + window.scrollX };
			heightInt = streetCell.offsetHeight;
			widthInt = streetCell.offsetWidth;
			streetLink.style.position = "absolute";
			streetLink.style.left = (offset.left - (window.getComputedStyle(streetLink.children[0]).fontSize != "24px" ? xShift : xShift + 6) + (widthInt / 2)) + "px";
			streetLink.style.top = (offset.top - yShift + heightInt) + "px";
			lineLink.style.position = "absolute";
			lineLink.style.left = (offset.left - (window.getComputedStyle(lineLink.children[0]).fontSize != "24px" ? xShift : xShift + 6)) + "px";
			lineLink.style.top = (offset.top - yShift + heightInt) + "px";
		}
		else if(i < 13 && i > 1) {
			let cornerCell = document.getElementById("cornerCell" + (i + 10)),
				streetLink = document.getElementById("streetLink" + i),
				lineLink = document.getElementById("lineLink" + i),
				rect = cornerCell.getBoundingClientRect(),
				offset = { "top": rect.top + window.scrollY, "left": rect.left + window.scrollX };
			heightInt = cornerCell.offsetHeight;
			widthInt = cornerCell.offsetWidth;
			streetLink.style.position = "absolute";
			streetLink.style.left = (offset.left - (window.getComputedStyle(streetLink.children[0]).fontSize != "24px" ? xShift : xShift + 6) + (widthInt / 2)) + "px";
			streetLink.style.top = (offset.top - yShift + heightInt) + "px";
			lineLink.style.position = "absolute";
			lineLink.style.left = (offset.left - (window.getComputedStyle(lineLink.children[0]).fontSize != "24px" ? xShift : xShift + 6)) + "px";
			lineLink.style.top = (offset.top - yShift + heightInt) + "px";
		}
		if(i < 23) {
			let cornerCell = document.getElementById("cornerCell" + i),
				cornerLink = document.getElementById("cornerLink" + i),
				rect = cornerCell.getBoundingClientRect(),
				offset = { "top": rect.top + window.scrollY, "left": rect.left + window.scrollX };
			cornerLink.style.position = "absolute";
			cornerLink.style.left = (offset.left - (window.getComputedStyle(cornerLink.children[0]).fontSize != "24px" ? xShift : xShift + 6)) + "px";
			cornerLink.style.top = (offset.top - yShift) + "px";
		}
		if(i <= 11) {
			let splitCell = document.getElementById("splitCell" + i),
				splitLink = document.getElementById("splitLink" + i),
				rect = splitCell.getBoundingClientRect(),
				offset = { "top": rect.top + window.scrollY, "left": rect.left + window.scrollX };
			heightInt = splitCell.offsetHeight;
			splitLink.style.position = "absolute";
			splitLink.style.left = (offset.left - (window.getComputedStyle(splitLink.children[0]).fontSize != "24px" ? xShift : xShift + 6)) + "px";
			splitLink.style.top = (offset.top - yShift + (heightInt / 2)) + "px";
		}
		else if(i > 11 && i < 34) {
			let cornerCell = document.getElementById("cornerCell" + (i - 11)),
				splitLink = document.getElementById("splitLink" + i),
				rect = cornerCell.getBoundingClientRect(),
				offset = { "top": rect.top + window.scrollY, "left": rect.left + window.scrollX };
			heightInt = cornerCell.offsetHeight;
			splitLink.style.position = "absolute";
			splitLink.style.left = (offset.left - (window.getComputedStyle(splitLink.children[0]).fontSize != "24px" ? xShift : xShift + 6)) + "px";
			splitLink.style.top = (offset.top - yShift + (heightInt / 2)) + "px";
		}
		else {
			if(i == 34) {
				let vertCell = document.getElementById("vertCell1"),
					splitLink1 = document.getElementById("splitLink34"),
					splitLink2 = document.getElementById("splitLink35"),
					rect = vertCell.getBoundingClientRect(),
					offset = { "top": rect.top + window.scrollY, "left": rect.left + window.scrollX };
				heightInt = vertCell.offsetHeight;
				widthInt = vertCell.offsetWidth;
				splitLink1.style.position = "absolute";
				splitLink1.style.left = (offset.left - (window.getComputedStyle(splitLink1.children[0]).fontSize != "24px" ? xShift : xShift + 6) + (widthInt / 2)) + "px";
				splitLink1.style.top = (offset.top - yShift) + "px";
				splitLink2.style.position = "absolute";
				splitLink2.style.left = (offset.left - (window.getComputedStyle(splitLink2.children[0]).fontSize != "24px" ? xShift : xShift + 6) + (widthInt / 2)) + "px";
				splitLink2.style.top = (offset.top - yShift + heightInt) + "px";
				i++;
			}
			else if(i == 58) {
				let td = document.getElementById("td00"),
					splitLink = document.getElementById("splitLink58"),
					rect = td.getBoundingClientRect(),
					offset = { "top": rect.top + window.scrollY, "left": rect.left + window.scrollX };
				heightInt = td.offsetHeight;
				widthInt = td.offsetWidth;
				splitLink.style.position = "absolute";
				splitLink.style.left = (offset.left - (window.getComputedStyle(splitLink.children[0]).fontSize != "24px" ? xShift : xShift + 6) + (widthInt / 2)) + "px";
				splitLink.style.top = (offset.top - yShift + (heightInt * 1.5)) + "px";
			}
			else {
				let cornerCell = document.getElementById("cornerCell" + ((i / 2) - 17)),
					splitLink1 = document.getElementById("splitLink" + i),
					splitLink2 = document.getElementById("splitLink" + (i + 1)),
					rect = cornerCell.getBoundingClientRect(),
					offset = { "top": rect.top + window.scrollY, "left": rect.left + window.scrollX };
				heightInt = cornerCell.offsetHeight;
				widthInt = cornerCell.offsetWidth;
				splitLink1.style.position = "absolute";
				splitLink1.style.left = (offset.left - (window.getComputedStyle(splitLink1.children[0]).fontSize != "24px" ? xShift : xShift + 6) + (widthInt / 2)) + "px";
				splitLink1.style.top = (offset.top - yShift) + "px";
				splitLink2.style.position = "absolute";
				splitLink2.style.left = (offset.left - (window.getComputedStyle(splitLink2.children[0]).fontSize != "24px" ? xShift : xShift + 6) + (widthInt / 2)) + "px";
				splitLink2.style.top = (offset.top - yShift + heightInt) + "px";
				i++;
			}
		}
	}
	// Show all corner, line, split, and street markers.
	for(let i = 1; i < 59; i++) {
		if(i < 13) {
			document.getElementById("streetLink" + i).style.display = "inline";
			document.getElementById("lineLink" + i).style.display = "inline";
		}
		if(i < 23) {
			document.getElementById("cornerLink" + i).style.display = "inline";
		}
		document.getElementById("splitLink" + i).style.display = "inline";
	}
};



/*

Adds the listeners for all page links.

    - obj is an object representing all possible bet arrays. 

*/
var addListeners = obj => {
	// Extract all roulette table bets from the provided object.
	let splitBets = obj.splitBets,
		lineBets = obj.lineBets,
		streetBets = obj.streetBets,
		cornerBets = obj.cornerBets,
		singleBets = obj.singleBets,
		dozenBets = obj.dozenBets,
		halfBets = obj.halfBets,
		columnBets = obj.columnBets,
		parityBets = obj.parityBets,
		colorBets = obj.colorBets,
		dozen1 = obj.dozen1,
		dozen2 = obj.dozen2,
		dozen3 = obj.dozen3,
		col1 = obj.col1,
		col2 = obj.col2,
		col3 = obj.col3,
		red = obj.red,
		lines = obj.lines,
		streets = obj.streets,
		splits = obj.splits,
		corners = obj.corners;
	// Listen for a click event on a corner, line, split, or street marker on the roulette table.
	let popBetList = document.getElementsByClassName("popBet");
	for(let u = 0; u < popBetList.length; u++) {
		popBetList[u].addEventListener("click", e => {
			let curBubble = document.getElementById("bubble");
			if(curBubble != null) { curBubble.remove(); }
			let header = "",
				og = e.target;
				id = e.target.id,
				idNum = "",
				scenario = 0,
				currentValue = 0;
			if(id.includes("street")) { scenario = 1; }
			else if(id.includes("line")) { scenario = 2; }
			else if(id.includes("split")) { scenario = 3; }
			else if(id.includes("corner")) { scenario = 4; }
			if(scenario == 1) {
				idNum = id.substring(6);
				header = "Street " + idNum + ": ";
				for(let i = 0; i < streets["street" + idNum].length; i++) {
					header += streets["street" + idNum][i];
					if(i != streets["street" + idNum].length - 1) {
						header += ", ";
					}
				}
				if(streetBets[parseInt(idNum) - 1] != 0) {
					currentValue = streetBets[parseInt(idNum) - 1];
				}
			}
			else if(scenario == 2) {
				if(id.substring(4) == 1) {
					header = "Top Line: 0, 00, 1, 2, 3";
					idNum = "1";
				}
				else {
					idNum = id.substring(4);
					header = "Line " + idNum + ": ";
					for(let i = 0; i < lines["line" + idNum].length; i++) {
						header += lines["line" + idNum][i];
						if(i != lines["line" + idNum].length - 1) {
							header += ", ";
						}
					}
				}
				if(idNum == "" && lineBets[0] != 0) {
					currentValue = lineBets[0];
				}
				else if(lineBets[parseInt(idNum) - 1] != 0) {
					currentValue = lineBets[parseInt(idNum) - 1];
				}
			}
			else if(scenario == 3) {
				idNum = id.substring(5);
				if(idNum == 58) {
					header = "Row: 0, 00";
				}
				else {
					header = "Split " + idNum + ": ";
					for(let i = 0; i < splits["split" + idNum].length; i++) {
						header += splits["split" + idNum][i];
						if(i != splits["split" + idNum].length - 1) {
							header += ", ";
						}
					}
				}
				if(splitBets[parseInt(idNum) - 1] != 0) {
					currentValue = splitBets[parseInt(idNum) - 1];
				}
			}
			else if(scenario == 4) {
				idNum = id.substring(6);
				header = "Corner " + idNum + ": ";
				for(let i = 0; i < corners["corner" + idNum].length; i++) {
					header += corners["corner" + idNum][i];
					if(i != corners["corner" + idNum].length - 1) {
						header += ", ";
					}
				}
				if(cornerBets[parseInt(idNum) - 1] != 0) {
					currentValue = cornerBets[parseInt(idNum) - 1];
				}
			}
			let bubble = document.createElement("div"),
				row = document.createElement("div"),
				inputField = document.createElement("div"),
				input = document.createElement("input"),
				label = document.createElement("label");
			bubble.id = "bubble";
			bubble.style.backgroundColor = "lightblue";
			row.id = "bubbleRow";
			row.classList.add("row", "center", "numberedCell");
			row.textContent = header;
			row.style.backgroundColor = "lightblue";
			inputField.classList.add("input-field");
			inputField.style.backgroundColor = "lightblue";
			input.id = "bubbleInput";
			input.setAttribute("type", "number");
			input.setAttribute("idNum", idNum);
			input.setAttribute("scenario", scenario);
			input.classList.add("center");
			label.setAttribute("for", "bubbleInput");
			label.style.backgroundColor = "lightblue";
			label.textContent = "BET";
			inputField.append(input, label);
			row.append(inputField);
			bubble.append(row);
			document.querySelector("main").append(bubble);
			let bubbleWidth = window.getComputedStyle(bubble).width,
				rect = popBetList[u].getBoundingClientRect(),
				offset = { "top": rect.top + window.scrollY, "left": rect.left + window.scrollX };
			bubble.style.left = (offset.left - (parseInt(bubbleWidth.substring(0, bubbleWidth.length - 2)) / 2.2)) + "px";
			bubble.style.top = (offset.top - 150) + "px";
			label.click();
			if(currentValue != 0) { input.value = currentValue; }
			input.addEventListener("input", event => {
				if(event.target.getAttribute("scenario") == 1) {
					event.target.value.length > 0 ? streetBets[parseInt(event.target.getAttribute("idNum")) - 1] = parseInt(event.target.value)
						: streetBets[parseInt(event.target.getAttribute("idNum")) - 1] = 0;
				}
				else if(event.target.getAttribute("scenario") == 2) {
					event.target.value.length > 0 ? lineBets[parseInt(event.target.getAttribute("idNum")) - 1] = parseInt(event.target.value)
						: lineBets[parseInt(event.target.getAttribute("idNum")) - 1] = 0;
				}
				else if(event.target.getAttribute("scenario") == 3) {
					event.target.value.length > 0 ? splitBets[parseInt(event.target.getAttribute("idNum")) - 1] = parseInt(event.target.value)
						: splitBets[parseInt(event.target.getAttribute("idNum")) - 1] = 0;
				}
				else if(event.target.getAttribute("scenario") == 4) {
					event.target.value.length > 0 ? cornerBets[parseInt(event.target.getAttribute("idNum")) - 1] = parseInt(event.target.value)
						: cornerBets[parseInt(event.target.getAttribute("idNum")) - 1] = 0;
				}
				if(event.target.value.length > 0 && window.getComputedStyle(og).fontSize != "24px") {
					og.parentNode.style.left = (parseFloat(og.parentNode.style.left.substring(0, og.parentNode.style.left.length - 2)) - 6) + "px";
					og.style.setProperty("font-size", "24px", "important");
				}
				else if(event.target.value.length == 0 && window.getComputedStyle(og).fontSize == "24px") {
					og.parentNode.style.left = (parseFloat(og.parentNode.style.left.substring(0, og.parentNode.style.left.length - 2)) + 6) + "px";
					og.style.setProperty("font-size", "12px", "important");
				}
			});
		});
	}
	// Listen for click and input events on all roulette table side bets.
	let posList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "00"];
	for(let t = 0; t < posList.length; t++) {
		let posElem = document.getElementById("pos" + posList[t]);
		posElem.addEventListener("input", e => {
			let bubble = document.getElementById("bubble"),
				iter = e.target.id.substring(3);
			if(bubble != null) { bubble.remove(); }
			if(iter == "A") { e.target.value.length > 0 ? halfBets[0] = parseInt(e.target.value) : halfBets[0] = 0; }
			else if(iter == "B") { e.target.value.length > 0 ? halfBets[1] = parseInt(e.target.value) : halfBets[1] = 0; }
			else if(iter == "C") { e.target.value.length > 0 ? columnBets[2] = parseInt(e.target.value) : columnBets[2] = 0; }
			else if(iter == "D") { e.target.value.length > 0 ? columnBets[1] = parseInt(e.target.value) : columnBets[1] = 0; }
			else if(iter == "E") { e.target.value.length > 0 ? columnBets[0] = parseInt(e.target.value) : columnBets[0] = 0; }
			else if(iter == "F") { e.target.value.length > 0 ? dozenBets[0] = parseInt(e.target.value) : dozenBets[0] = 0; }
			else if(iter == "G") { e.target.value.length > 0 ? dozenBets[1] = parseInt(e.target.value) : dozenBets[1] = 0; }
			else if(iter == "H") { e.target.value.length > 0 ? dozenBets[2] = parseInt(e.target.value) : dozenBets[2] = 0; }
			else if(iter == "I") { e.target.value.length > 0 ? parityBets[0] = parseInt(e.target.value) : parityBets[0] = 0; }
			else if(iter == "J") { e.target.value.length > 0 ? colorBets[0] = parseInt(e.target.value) : colorBets[0] = 0; }
			else if(iter == "K") { e.target.value.length > 0 ? colorBets[1] = parseInt(e.target.value) : colorBets[1] = 0; }
			else if(iter == "L") { e.target.value.length > 0 ? parityBets[1] = parseInt(e.target.value) : parityBets[1] = 0; }
			else if(iter == "00") { e.target.value.length > 0 ? singleBets[37] = parseInt(e.target.value) : singleBets[37] = 0; }
		});
		posElem.addEventListener("click", () => {
			let bubble = document.getElementById("bubble");
			if(bubble != null) { bubble.remove(); }
		});
	}
	// Listen for click and input events on all single bets.
	for(let i = 0; i < 37; i++) {
		let posElem = document.getElementById("pos" + i);
		posElem.addEventListener("input", event => {
			let bubble = document.getElementById("bubble");
			if(bubble != null) { bubble.remove(); }
			event.target.value.length > 0 ? singleBets[parseInt(event.target.id.substring(3))] = parseInt(event.target.value)
				: singleBets[parseInt(event.target.id.substring(3))] = 0;
		});
		posElem.addEventListener("click", event => {
			event.preventDefault();
			let bubble = document.getElementById("bubble");
			if(bubble != null) { bubble.remove(); }
		})
	}
	// Listen for a click event anywhere on the document to handle the removal of a bet bubble.
	document.addEventListener("click", e => {
	    if(e.target.id == "" && e.target.getAttribute("for") != "bubbleInput") {
	    	let bubble = document.getElementById("bubble");
	    	if(bubble != null) { bubble.remove(); }
	    }
	});
	// Listen for a click event on the submit button in order to open up a corresponding result window.
	document.getElementById("submit").addEventListener("click", e => {
		e.preventDefault();
		let holder = [],
			sumOutput = 0,
			reducer = (accumulator, current) => accumulator + current,
			sumInput = splitBets.reduce(reducer, 0) + lineBets.reduce(reducer, 0) +
				streetBets.reduce(reducer, 0) + cornerBets.reduce(reducer, 0) +
				singleBets.reduce(reducer, 0) + dozenBets.reduce(reducer, 0) +
				halfBets.reduce(reducer, 0) + columnBets.reduce(reducer, 0) +
				parityBets.reduce(reducer, 0) + colorBets.reduce(reducer, 0);
		for(let j = 0; j < 37; j++) {
			sumOutput = 0;
			sumOutput += singleBets[j] * 36;
			for(let i = 1; i < 13; i++) {
				if(i > 1 && lines["line" + i].includes(j)) {
					sumOutput += lineBets[i - 1] * 6;
				}
				else if(i == 1 && j < 4) {
					sumOutput += lineBets[i - 1] * 7;
				}
			}
			for(let i = 1; i < 13; i++) {
				if(streets["street" + i].includes(j)) {
					sumOutput += streetBets[i - 1] * 12;
				}
			}
			for(let i = 1; i < 58; i++) {
				if(splits["split" + i].includes(j)) {
					sumOutput += splitBets[i - 1] * 18;
				}
			}
			if(j == 0) {
				sumOutput += splitBets[57] * 18;
			}
			for(let i = 1; i < 23; i++) {
				if(corners["corner" + i].includes(j)) {
					sumOutput += cornerBets[i - 1] * 9;
				}
			}
			if(dozen1.includes(j)) { sumOutput += dozenBets[0] * 3; }
			else if(dozen2.includes(j)) { sumOutput += dozenBets[1] * 3; }
			else if(dozen3.includes(j)) { sumOutput += dozenBets[2] * 3; }
			j < 19 ? sumOutput += halfBets[0] * 2 : sumOutput += halfBets[1] * 2;
			if(col1.includes(j)) { sumOutput += columnBets[0] * 3; }
			else if(col2.includes(j)) { sumOutput += columnBets[1] * 3; }
			else if(col3.includes(j)) { sumOutput += columnBets[2] * 3; }
			red.includes(j) ? sumOutput += colorBets[0] * 2 : sumOutput += colorBets[1] * 2;
			j % 2 == 0 ? sumOutput += parityBets[0] * 2 : sumOutput += parityBets[1] * 2;
			holder.push([String(j), sumOutput]);
		}
		holder.splice(0, 0, ["00", (singleBets[37] * 36) + (lineBets[0] * 7) + (splitBets[57] * 17)]);
		holder.splice(0, 0, [sumInput]);
		ipcRenderer.send("result", holder);
	});
	// Listen for a click event on the reset button in order to clear all bets off the roulette table.
	document.getElementById("reset").addEventListener("click", e => {
		e.preventDefault();
		let bubble = document.getElementById("bubble"),
			circleBetList = document.getElementsByClassName("circleBet"),
			letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
		if(bubble != null) { bubble.remove(); }
		for(let k = 0; k < circleBetList.length; k++) {
			if(circleBetList[k].style.fontSize == "24px") {
				circleBetList[k].parentNode.style.setProperty("left", (parseFloat(circleBetList[k].parentNode.style.left.substring(0, circleBetList[k].parentNode.style.left.length - 2)) + 6) + "px");
				circleBetList[k].style.setProperty("font-size", "12px", "important");
			}
		}
		splitBets = new Array(58).fill(0);
		lineBets = new Array(13).fill(0);
		streetBets = new Array(12).fill(0);
		cornerBets = new Array(22).fill(0);
		singleBets = new Array(38).fill(0);
		dozenBets = new Array(3).fill(0);
		halfBets = new Array(2).fill(0);
		columnBets = new Array(3).fill(0);
		parityBets = new Array(2).fill(0);
		colorBets = new Array(2).fill(0);
		for(let i = 0; i < 37; i++) {
			let posElem = document.getElementById("pos" + i);
			posElem.value = "";
			posElem.nextElementSibling.classList.remove("active");
		}
		for(let j = 0; j < letters.length; j++) {
			let posElem = document.getElementById("pos" + letters[j]);
			posElem.value = "";
			posElem.nextElementSibling.classList.remove("active");
		}
		M.Toast.dismissAll();
		M.toast({"html": "All bets on the roulette table have been cleared.", "classes": "rounded"});
	});
};



/*

Loads the introductory modal if necessary.

    - modalInstances is an array containing all modal instances on the page.

*/
var introductionModal = modalInstances => {
	// Iterate through all modal instances until the helpModal is found.
	for(let k = 0; k < modalInstances.length; k++) {
		if(modalInstances[k].id == "helpModal") {
			// Change the title of the helpModal from "Help" to "Introduction" on an initial load.
			modalInstances[k].el.children[0].children[0].innerText = "Introduction";
			// Open the introductory modal.
			modalInstances[k].open();
			// Define the callback that will handle a change in the helpModal title.
			let mutationCaller = (mutationsList, observer) => {
			    mutationsList.forEach(mutation => {
			        if(mutation.attributeName === "class") {
			            if(mutation.target.id == "helpModal" && !mutation.target.classList.contains("open")) {
							mutation.target.children[0].children[0].innerText = "Help";
			            }
			        }
			    })
			};
			// Define an observer and let it trigger an event whenever the class list of the helpModal changes.
			const mutationObserver = new MutationObserver(mutationCaller);
			mutationObserver.observe(modalInstances[k].el, { attributes: true });
		}
	}
};



// Wait for the window to finish loading.
document.addEventListener("DOMContentLoaded", () => {
	// Fix the placement of all roulette table markers.
	markerPlacement(6, 12);
	// Add all roulette table listeners.
	addListeners(betArrays());
	// Introduce a small delay to allow the tooltips and modals to properly initialize.
	setTimeout(() => {
		// Initialize the modals and tooltips after a small delay.
	    let tooltipElems = document.querySelectorAll(".tooltipped"),
	    	modalElems = document.querySelectorAll(".modal"),
	    	tooltipInstancesList = M.Tooltip.init(tooltipElems),
    		modalInstancesList = M.Modal.init(modalElems),
    		dir = path.resolve(__dirname, "../parameters.json");
    	// Check if a parameters file exists.
		if(!fs.existsSync(dir)) { introductionModal(modalInstancesList); }
		else {
			// If a parameters file exists then check the introductionCheck on the helpModal.
			const parameters = JSON.parse(fs.readFileSync(dir, "UTF8"));
			parameters.introduction == true
				? introductionModal(modalInstancesList)
				: document.getElementById("introductionCheck").checked = true;
		}
		// Listen for a check/uncheck on the introductionCheck located in the helpModal.
		document.getElementById("introductionCheck").addEventListener("change", () => {
			// Write a parameters file to indicate whether the introductory message is to be showed or not.
			document.getElementById("introductionCheck").checked
				? fs.writeFileSync(dir, JSON.stringify({"introduction": false}), "UTF8")
				: fs.writeFileSync(dir, JSON.stringify({"introduction": true}), "UTF8");
		});
		// Listen for a resize of the window.
		window.addEventListener("resize", () => {
			// Remove any bubble on a resize.
			let currentBubble = document.getElementById("bubble");
			if(currentBubble != null) { currentBubble.remove(); }
			// Fix the placement of all roulette table markers.
			markerPlacement(6, 12);
		});
	}, 50);
});