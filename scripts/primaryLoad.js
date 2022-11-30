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
	var splitBets = new Array(58).fill(0),
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
	var dozen1 = [1,2,3,4,5,6,7,8,9,10,11,12],
		dozen2 = [13,14,15,16,17,18,19,20,21,22,23,24],
		dozen3 = [25,26,27,28,29,30,31,32,33,34,35,36],
		col1 = [1,4,7,10,13,16,19,22,25,28,31,34],
		col2 = [2,5,8,11,14,17,20,23,26,29,32,35],
		col3 = [3,6,9,12,15,18,21,24,27,30,33,36],
		red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
	// Define the roulette table lines.
	var lines = {
		"line2": [1,2,3,4,5,6],
		"line3": [4,5,6,7,8,9],
		"line4": [7,8,9,10,11,12],
		"line5": [10,11,12,13,14,15],
		"line6": [13,14,15,16,17,18],
		"line7": [16,17,18,19,20,21],
		"line8": [19,20,21,22,23,24],
		"line9": [22,23,24,25,26,27],
		"line10": [25,26,27,28,29,30],
		"line11": [28,29,30,31,32,33],
		"line12": [31,32,33,34,35,36]
	};
	// Define the roulette table streets.
	var streets = {
		"street1": [1,2,3],
		"street2": [4,5,6],
		"street3": [7,8,9],
		"street4": [10,11,12],
		"street5": [13,14,15],
		"street6": [16,17,18],
		"street7": [19,20,21],
		"street8": [22,23,24],
		"street9": [25,26,27],
		"street10": [28,29,30],
		"street11": [31,32,33],
		"street12": [34,35,36]
	};
	// Define the roulette table splits.
	var splits = {
		"split1": [3,6],
		"split2": [6,9],
		"split3": [9,12],
		"split4": [12,15],
		"split5": [15,18],
		"split6": [18,21],
		"split7": [21,24],
		"split8": [24,27],
		"split9": [27,30],
		"split10": [30,33],
		"split11": [33,36],
		"split12": [2,5],
		"split13": [5,8],
		"split14": [8,11],
		"split15": [11,14],
		"split16": [14,17],
		"split17": [17,20],
		"split18": [20,23],
		"split19": [23,26],
		"split20": [26,29],
		"split21": [29,32],
		"split22": [32,35],
		"split23": [1,4],
		"split24": [4,7],
		"split25": [7,10],
		"split26": [10,13],
		"split27": [13,16],
		"split28": [16,19],
		"split29": [19,22],
		"split30": [22,25],
		"split31": [25,28],
		"split32": [28,31],
		"split33": [31,34],
		"split34": [2,3],
		"split35": [1,2],
		"split36": [5,6],
		"split37": [4,5],
		"split38": [8,9],
		"split39": [7,8],
		"split40": [11,12],
		"split41": [10,11],
		"split42": [14,15],
		"split43": [13,14],
		"split44": [17,18],
		"split45": [16,17],
		"split46": [20,21],
		"split47": [19,20],
		"split48": [23,24],
		"split49": [22,23],
		"split50": [26,27],
		"split51": [25,26],
		"split52": [29,30],
		"split53": [28,29],
		"split54": [32,33],
		"split55": [31,32],
		"split56": [35,36],
		"split57": [34,35]
	};
	// Define the roulette table corners.
	var corners = {
		"corner1": [2,3,5,6],
		"corner2": [5,6,8,9],
		"corner3": [8,9,11,12],
		"corner4": [11,12,14,15],
		"corner5": [14,15,17,18],
		"corner6": [17,18,20,21],
		"corner7": [20,21,23,24],
		"corner8": [23,24,26,27],
		"corner9": [26,27,29,30],
		"corner10": [29,30,32,33],
		"corner11": [32,33,35,36],
		"corner12": [1,2,4,5],
		"corner13": [4,5,7,8],
		"corner14": [7,8,10,11],
		"corner15": [10,11,13,14],
		"corner16": [13,14,16,17],
		"corner17": [16,17,19,20],
		"corner18": [19,20,22,23],
		"corner19": [22,23,25,26],
		"corner20": [25,26,28,29],
		"corner21": [28,29,31,32],
		"corner22": [31,32,34,35]
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

*/
var markerPlacement = () => {
	// Hide all corner, line, split, and street markers.
	for(var i = 1; i < 59; i++) {
		if(i < 13) {
			$("#streetLink" + i).hide();
			$("#lineLink" + i).hide();
		}
		if(i < 23) {
			$("#cornerLink" + i).hide();
		}
		$("#splitLink" + i).hide();
	}
	// Position all corner, line, split, and street markers.
	for(var i = 1; i < 59; i++) {
		var str = "",
			width = "",
			heightInt = "",
			widthInt = "";
		if(i == 1) {
			str = $("#streetCell1").css("height");
			width = $("#streetCell1").css("width");
			widthInt = parseInt(width.substring(0, width.length - 2));
			heightInt = parseInt(str.substring(0, str.length - 2));
			$("#streetLink" + i).css({
				"position": "absolute",
				"left": $("#streetCell1").offset().left - 12 + (widthInt / 2),
				"top": $("#streetCell1").offset().top - 12 + heightInt
			});
			$("#lineLink" + i).css({
				"position": "absolute",
				"left": $("#streetCell1").offset().left - 12,
				"top": $("#streetCell1").offset().top - 12 + heightInt
			});
		}
		else if(i < 13 && i > 1) {
			str = $("#cornerCell" + (i + 10)).css("height");
			width = $("#cornerCell" + (i + 10)).css("width");
			widthInt = parseInt(width.substring(0, width.length - 2));
			heightInt = parseInt(str.substring(0, str.length - 2));
			$("#streetLink" + i).css({
				"position": "absolute",
				"left": $("#cornerCell" + (i + 10)).offset().left - 12 + (widthInt / 2),
				"top": $("#cornerCell" + (i + 10)).offset().top - 12 + heightInt
			});
			$("#lineLink" + i).css({
				"position": "absolute",
				"left": $("#cornerCell" + (i + 10)).offset().left - 12,
				"top": $("#cornerCell" + (i + 10)).offset().top - 12 + heightInt
			});
		}
		if(i < 23) {
			$("#cornerLink" + i).css({
				"position": "absolute",
				"left": $("#cornerCell" + i).offset().left - 12,
				"top": $("#cornerCell" + i).offset().top - 12
			});
		}
		if(i <= 11) {
			str = $("#splitCell" + i).css("height");
			heightInt = parseInt(str.substring(0, str.length - 2));
			$("#splitLink" + i).css({
				"position": "absolute",
				"left": $("#splitCell" + i).offset().left - 12,
				"top": $("#splitCell" + i).offset().top - 12 + (heightInt / 2)
			});
		}
		else if(i > 11 && i < 34) {
			str = $("#cornerCell" + (i - 11)).css("height");
			heightInt = parseInt(str.substring(0, str.length - 2));
			$("#splitLink" + i).css({
				"position": "absolute",
				"left": $("#cornerCell" + (i - 11)).offset().left - 12,
				"top": $("#cornerCell" + (i - 11)).offset().top - 12 + (heightInt / 2)
			});
		}
		else {
			if(i == 34) {
				str = $("#vertCell1").css("height");
				width = $("#vertCell1").css("width");
				widthInt = parseInt(width.substring(0, width.length - 2));
				heightInt = parseInt(str.substring(0, str.length - 2));
				$("#splitLink" + i).css({
					"position": "absolute",
					"left": $("#vertCell1").offset().left - 12 + (widthInt / 2),
					"top": $("#vertCell1").offset().top - 12
				});
				$("#splitLink" + (i + 1)).css({
					"position": "absolute",
					"left": $("#vertCell1").offset().left - 12 + (widthInt / 2),
					"top": $("#vertCell1").offset().top - 12 + heightInt
				});
				i++;
			}
			else if(i == 58) {
				str = $("#td00").css("height");
				width = $("#td00").css("width");
				widthInt = parseInt(width.substring(0, width.length - 2));
				heightInt = parseInt(str.substring(0, str.length - 2));
				$("#splitLink" + i).css({
					"position": "absolute",
					"left": $("#td00").offset().left - 12 + (widthInt / 2),
					"top": $("#td00").offset().top - 12 + (heightInt * 1.5)
				});
			}
			else {
				str = $("#cornerCell" + ((i / 2) - 17)).css("height");
				width = $("#cornerCell" + ((i / 2) - 17)).css("width");
				widthInt = parseInt(width.substring(0, width.length - 2));
				heightInt = parseInt(str.substring(0, str.length - 2));
				$("#splitLink" + i).css({
					"position": "absolute",
					"left": $("#cornerCell" + ((i / 2) - 17)).offset().left - 12 + (widthInt / 2),
					"top": $("#cornerCell" + ((i / 2) - 17)).offset().top - 12
				});
				$("#splitLink" + (i + 1)).css({
					"position": "absolute",
					"left": $("#cornerCell" + ((i / 2) - 17)).offset().left - 12 + (widthInt / 2),
					"top": $("#cornerCell" + ((i / 2) - 17)).offset().top - 12 + heightInt
				});
				i++;
			}
		}
	}
	// Show all corner, line, split, and street markers.
	for(var i = 1; i < 59; i++) {
		if(i < 13) {
			$("#streetLink" + i).show();
			$("#lineLink" + i).show();
		}
		if(i < 23) {
			$("#cornerLink" + i).show();
		}
		$("#splitLink" + i).show();
	}
};



/*

Adds the listeners for all page links.

    - obj is an object representing all possible bet arrays. 

*/
var addListeners = obj => {
	// Extract all roulette table bets from the provided object.
	var splitBets = obj.splitBets,
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
	$(".popBet").click(function(e) {
		e.preventDefault();
		$("#bubble").remove();
		var header = "",
			og = $(this);
			id = $(this).attr("id"),
			idNum = "",
			scenario = 0,
			currentValue = 0;
		if(id.includes("street")) { scenario = 1; }
		else if(id.includes("line")) { scenario = 2; }
		else if(id.includes("split")) { scenario = 3; }
		else if(id.includes("corner")) { scenario = 4; }
		if(scenario == 1) {
			idNum = id.substring(10);
			header = "Street " + idNum + ": ";
			for(var i = 0; i < streets["street" + idNum].length; i++) {
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
			if(id.substring(8) == 1) {
				header = "Top Line: 0, 00, 1, 2, 3";
				idNum = "1";
			}
			else {
				idNum = id.substring(8);
				header = "Line " + idNum + ": ";
				for(var i = 0; i < lines["line" + idNum].length; i++) {
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
			idNum = id.substring(9);
			if(idNum == 58) {
				header = "Row: 0, 00";
			}
			else {
				header = "Split " + idNum + ": ";
				for(var i = 0; i < splits["split" + idNum].length; i++) {
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
			idNum = id.substring(10);
			header = "Corner " + idNum + ": ";
			for(var i = 0; i < corners["corner" + idNum].length; i++) {
				header += corners["corner" + idNum][i];
				if(i != corners["corner" + idNum].length - 1) {
					header += ", ";
				}
			}
			if(cornerBets[parseInt(idNum) - 1] != 0) {
				currentValue = cornerBets[parseInt(idNum) - 1];
			}
		}
		var bubble = $("<div>").attr("id", "bubble").css("background-color", "lightblue"),
			row = $("<div>").attr("id", "bubbleRow").addClass("row center numberedCell")
				.text(header).css("background-color", "lightblue"),
			inputField = $("<div>").addClass("input-field").css("background-color", "lightblue"),
			input = $("<input>").addClass("center").attr({
				"id": "bubbleInput",
				"type": "number"
			}),
			label = $("<label>").css("background-color", "lightblue").attr("for", "bubbleInput").text("BET");
		inputField.append(input, label);
		row.append(inputField);
		bubble.append(row);
		$("main").append(bubble);
		var bubbleWidth = bubble.css("width");
		bubble.css({
			"left": $(this).offset().left - (parseInt(bubbleWidth.substring(0, bubbleWidth.length - 2)) / 2.2),
			"top": $(this).offset().top - 150
		});
		label.click();
		if(currentValue != 0) {
			input.val(currentValue);
		}
		input.on("input", { "idNum": idNum, "scenario": scenario }, function(event) {
			if(event.data.scenario == 1) {
				$(this).val().length > 0 ? streetBets[parseInt(event.data.idNum) - 1] = parseInt($(this).val())
					: streetBets[parseInt(event.data.idNum) - 1] = 0;
				$(this).val().length > 0 ? og.children().css("color", "purple")
					: og.children().css("color", "purple");
			}
			else if(event.data.scenario == 2) {
				$(this).val().length > 0 ? lineBets[parseInt(event.data.idNum) - 1] = parseInt($(this).val())
					: lineBets[parseInt(event.data.idNum) - 1] = 0;
				$(this).val().length > 0 ? og.children().css("color", "burgundy")
					: og.children().css("color", "burgundy");
			}
			else if(event.data.scenario == 3) {
				$(this).val().length > 0 ? splitBets[parseInt(event.data.idNum) - 1] = parseInt($(this).val())
					: splitBets[parseInt(event.data.idNum) - 1] = 0;
				$(this).val().length > 0 ? og.children().css("color", "teal")
					: og.children().css("color", "teal");
			}
			else if(event.data.scenario == 4) {
				$(this).val().length > 0 ? cornerBets[parseInt(event.data.idNum) - 1] = parseInt($(this).val())
					: cornerBets[parseInt(event.data.idNum) - 1] = 0;
				$(this).val().length > 0 ? og.children().css("color", "blue")
					: og.children().css("color", "blue");
			}
			$(this).val().length > 0 ? og.children().removeClass("white-text")
				: og.children().addClass("white-text");
		});
	});
	// Listen for click and input events on all roulette table side bets.
	$("#posA").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? halfBets[0] = parseInt($(this).val()) : halfBets[0] = 0;
	});
	$("#posA").on("click", function() {
		$("#bubble").remove();
	});
	$("#posB").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? halfBets[1] = parseInt($(this).val()) : halfBets[1] = 0;
	});
	$("#posB").on("click", function() {
		$("#bubble").remove();
	});
	$("#posC").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? columnBets[2] = parseInt($(this).val()) : columnBets[2] = 0;
	});
	$("#posC").on("click", function() {
		$("#bubble").remove();
	});
	$("#posD").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? columnBets[1] = parseInt($(this).val()) : columnBets[1] = 0;
	});
	$("#posD").on("click", function() {
		$("#bubble").remove();
	});
	$("#posE").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? columnBets[0] = parseInt($(this).val()) : columnBets[0] = 0;
	});
	$("#posE").on("click", function() {
		$("#bubble").remove();
	});
	$("#posF").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? dozenBets[0] = parseInt($(this).val()) : columnBets[0] = 0;
	});
	$("#posF").on("click", function() {
		$("#bubble").remove();
	});
	$("#posG").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? dozenBets[1] = parseInt($(this).val()) : columnBets[1] = 0;
	});
	$("#posG").on("click", function() {
		$("#bubble").remove();
	});
	$("#posH").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? dozenBets[2] = parseInt($(this).val()) : columnBets[2] = 0;
	});
	$("#posH").on("click", function() {
		$("#bubble").remove();
	});
	$("#posI").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? parityBets[0] = parseInt($(this).val()) : parityBets[0] = 0;
	});
	$("#posI").on("click", function() {
		$("#bubble").remove();
	});
	$("#posJ").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? colorBets[0] = parseInt($(this).val()) : colorBets[0] = 0;
	});
	$("#posJ").on("click", function() {
		$("#bubble").remove();
	});
	$("#posK").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? colorBets[1] = parseInt($(this).val()) : colorBets[1] = 0;
	});
	$("#posK").on("click", function() {
		$("#bubble").remove();
	});
	$("#posL").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? parityBets[1] = parseInt($(this).val()) : parityBets[1] = 0;
	});
	$("#posL").on("click", function() {
		$("#bubble").remove();
	});
	$("#pos00").on("input", function() {
		$("#bubble").remove();
		$(this).val().length > 0 ? singleBets[37] = parseInt($(this).val()) : singleBets[37] = 0;
	});
	$("#pos00").on("click", function() {
		$("#bubble").remove();
	});
	// Listen for click and input events on all single bets.
	for(var i = 0; i < 37; i++) {
		$("#pos" + i).on("input", { "iter": i }, function(event) {
			$("#bubble").remove();
			$(this).val().length > 0 ? singleBets[event.data.iter] = parseInt($(this).val())
				: singleBets[event.data.iter] = 0;
		});
		$("#pos" + i).on("click", function() {
			$("#bubble").remove();
		});
	}
	// Listen for a click event anywhere on the document to handle the removal of a bet bubble.
	$(document).click(function(e) {
		if($(event.target).attr("id") !== undefined) {
			var exception = !$(event.target).attr("id").includes("street") &&
				!$(event.target).attr("id").includes("line") &&
				!$(event.target).attr("id").includes("corner") &&
				!$(event.target).attr("id").includes("split");
		}
		else {
			var exception = true;
		}
	    if($(event.target).closest("#table").length === 0 && exception) {
	    	$("#bubble").remove();
	    }
	});
	// Listen for a click event on the submit button in order to open up a corresponding result window.
	$("#submit").click(function(e) {
		e.preventDefault();
		var holder = [],
			sumOutput = 0,
			reducer = (accumulator, current) => accumulator + current,
			sumInput = splitBets.reduce(reducer, 0) + lineBets.reduce(reducer, 0) +
				streetBets.reduce(reducer, 0) + cornerBets.reduce(reducer, 0) +
				singleBets.reduce(reducer, 0) + dozenBets.reduce(reducer, 0) +
				halfBets.reduce(reducer, 0) + columnBets.reduce(reducer, 0) +
				parityBets.reduce(reducer, 0) + colorBets.reduce(reducer, 0);
		for(var j = 0; j < 37; j++) {
			sumOutput = 0;
			sumOutput += singleBets[j] * 36;
			for(var i = 1; i < 13; i++) {
				if(i > 1 && lines["line" + i].includes(j)) {
					sumOutput += lineBets[i - 1] * 6;
				}
				else if(i == 1 && j < 4) {
					sumOutput += lineBets[i - 1] * 7;
				}
			}
			for(var i = 1; i < 13; i++) {
				if(streets["street" + i].includes(j)) {
					sumOutput += streetBets[i - 1] * 12;
				}
			}
			for(var i = 1; i < 58; i++) {
				if(splits["split" + i].includes(j)) {
					sumOutput += splitBets[i - 1] * 18;
				}
			}
			if(i == 0) {
				sumOutput += splitBets[57] * 18;
			}
			for(var i = 1; i < 23; i++) {
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
	$("#reset").click(function(e) {
		e.preventDefault();
		$("#bubble").remove();
		$("#message").remove();
		$("#resultContainer").remove();
		$(".circleBet").addClass("white-text");
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
		for(var i = 0; i < 37; i++) {
			$("#pos" + i).val("");
			$("#pos" + i).next().removeClass("active");
		}
		$("#pos00").val("");
		$("#pos00").next().removeClass("active");
		var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
		for(var i = 0; i < letters.length; i++) {
			$("#pos" + letters[i]).val("");
			$("#pos" + letters[i]).next().removeClass("active");
		}
		M.Toast.dismissAll();
		M.toast({"html": "All bets on the roulette table have been cleared.", "classes": "rounded"});
	});
};



// Wait for the window to finish loading.
$(document).ready(() => {
	// Fix the placement of all roulette table markers.
	markerPlacement();
	// Add all roulette table listeners.
	addListeners(betArrays());
	// Initialize the modals and tooltips after a small delay.
	setTimeout(() => {
	    var tooltipElems = document.querySelectorAll(".tooltipped"),
	    	modalElems = document.querySelectorAll(".modal"),
	    	tooltipInstances = M.Tooltip.init(tooltipElems),
    		modalInstances = M.Modal.init(modalElems);
	}, 50);
});