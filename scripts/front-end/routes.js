define(["jquery", "math", "app/functions"], ($, Math, functions) => {
	var exports = {};

	exports.add_listeners = router => {
		router.addRouteListener("def", (toState, fromState) => {
			$.get("/client/content.html").done(data => {
				$("body").empty();
				$("body").append(data);
				$("select").material_select();

				var splitBets = new Array(57).fill(0),
					lineBets = new Array(7).fill(0),
					streetBets = new Array(12).fill(0),
					cornerBets = new Array(22).fill(0),
					singleBets = new Array(38).fill(0),
					dozenBets = new Array(3).fill(0),
					halfBets = new Array(2).fill(0),
					columnBets = new Array(3).fill(0)
					parityBets = new Array(2).fill(0),
					colorBets = new Array(2).fill(0);

				var dozen1 = [1,2,3,4,5,6,7,8,9,10,11,12],
					dozen2 = [13,14,15,16,17,18,19,20,21,22,23,24],
					dozen3 = [25,26,27,28,29,30,31,32,33,34,35,36],
					col1 = [1,4,7,10,13,16,19,22,25,28,31,34],
					col2 = [2,5,8,11,14,17,20,24,26,29,32,35],
					col3 = [3,6,9,12,15,18,21,24,27,30,33,36],
					red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

				var lines = {
					"line2": [1,2,3,4,5,6],
					"line3": [7,8,9,10,11,12],
					"line4": [13,14,15,16,17,18],
					"line5": [19,20,21,22,23,24],
					"line6": [25,26,27,28,29,30],
					"line7": [31,32,33,34,35,36]
				};

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


				for(var i = 1; i < 58; i++) {
					if(i < 13) {
						$("#streetLink" + i).hide();
						$("#lineLink" + i).hide();
					}
					if(i < 23) {
						$("#cornerLink" + i).hide();
					}
					$("#splitLink" + i).hide();
				}

				for(var i = 1; i < 58; i++) {
					var str = "",
						width = "";
					if(i == 1) {
						str = $("#streetCell1").css("height");
						width = $("#streetCell1").css("width");
						$("#streetLink" + i).css({
							"position": "absolute",
							"left": $("#streetCell1").offset().left - 12 + (parseInt(width.substring(0, width.length - 2)) / 2),
							"top": $("#streetCell1").offset().top - 12 + parseInt(str.substring(0, str.length - 2))
						});
						$("#lineLink" + i).css({
							"position": "absolute",
							"left": $("#streetCell1").offset().left - 12,
							"top": $("#streetCell1").offset().top - 12 + parseInt(str.substring(0, str.length - 2))
						});
					}
					else if(i < 13 && i > 1) {
						str = $("#cornerCell" + (i + 10)).css("height");
						width = $("#cornerCell" + (i + 10)).css("width");
						$("#streetLink" + i).css({
							"position": "absolute",
							"left": $("#cornerCell" + (i + 10)).offset().left - 12 + (parseInt(width.substring(0, width.length - 2)) / 2),
							"top": $("#cornerCell" + (i + 10)).offset().top - 12 + parseInt(str.substring(0, str.length - 2))
						});
						$("#lineLink" + i).css({
							"position": "absolute",
							"left": $("#cornerCell" + (i + 10)).offset().left - 12,
							"top": $("#cornerCell" + (i + 10)).offset().top - 12 + parseInt(str.substring(0, str.length - 2))
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
						$("#splitLink" + i).css({
							"position": "absolute",
							"left": $("#splitCell" + i).offset().left - 12,
							"top": $("#splitCell" + i).offset().top - 12 + (parseInt(str.substring(0, str.length - 2)) / 2)
						});
					}
					else if(i > 11 && i < 34) {
						str = $("#cornerCell" + (i - 11)).css("height");
						$("#splitLink" + i).css({
							"position": "absolute",
							"left": $("#cornerCell" + (i - 11)).offset().left - 12,
							"top": $("#cornerCell" + (i - 11)).offset().top - 12 + (parseInt(str.substring(0, str.length - 2)) / 2)
						});
					}
					else {
						if(i == 34) {
							str = $("#vertCell1").css("height");
							width = $("#vertCell1").css("width");
							$("#splitLink" + i).css({
								"position": "absolute",
								"left": $("#vertCell1").offset().left - 12 + (parseInt(width.substring(0, width.length - 2)) / 2),
								"top": $("#vertCell1").offset().top - 12
							});
							$("#splitLink" + (i + 1)).css({
								"position": "absolute",
								"left": $("#vertCell1").offset().left - 12 + (parseInt(width.substring(0, width.length - 2)) / 2),
								"top": $("#vertCell1").offset().top - 12 + parseInt(str.substring(0, str.length - 2))
							});
							i++;
						}
						else {
							str = $("#cornerCell" + ((i / 2) - 17)).css("height");
							width = $("#cornerCell" + ((i / 2) - 17)).css("width");
							$("#splitLink" + i).css({
								"position": "absolute",
								"left": $("#cornerCell" + ((i / 2) - 17)).offset().left - 12 + (parseInt(width.substring(0, width.length - 2)) / 2),
								"top": $("#cornerCell" + ((i / 2) - 17)).offset().top - 12
							});
							$("#splitLink" + (i + 1)).css({
								"position": "absolute",
								"left": $("#cornerCell" + ((i / 2) - 17)).offset().left - 12 + (parseInt(width.substring(0, width.length - 2)) / 2),
								"top": $("#cornerCell" + ((i / 2) - 17)).offset().top - 12 + parseInt(str.substring(0, str.length - 2))
							});
							i++;
						}
					}
				}

				for(var i = 1; i < 58; i++) {
					if(i < 13) {
						$("#streetLink" + i).show();
						$("#lineLink" + i).show();
					}
					if(i < 23) {
						$("#cornerLink" + i).show();
					}
					$("#splitLink" + i).show();
				}

				$(".popBet").click(function(e) {
					e.preventDefault();
					$("#bubble").remove();
					var header = "",
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
						header = "Split " + idNum + ": ";
						for(var i = 0; i < splits["split" + idNum].length; i++) {
							header += splits["split" + idNum][i];
							if(i != splits["split" + idNum].length - 1) {
								header += ", ";
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
						row = $("<div>").attr("id", "bubbleRow").addClass("row center numberedCell").text(header).css("background-color", "lightblue"),
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
					if(currentValue != 0) {
						input.val(currentValue);
					}
					input.on("input", function() {
						if(scenario == 1) {
							$(this).val().length > 0 ? streetBets[parseInt(idNum) - 1] = parseInt($(this).val()) : streetBets[parseInt(idNum) - 1] = 0;
						}
						else if(scenario == 2) {
							$(this).val().length > 0 ? lineBets[parseInt(idNum) - 1] = parseInt($(this).val()) : lineBets[parseInt(idNum) - 1] = 0;
						}
						else if(scenario == 3) {
							$(this).val().length > 0 ? splitBets[parseInt(idNum) - 1] = parseInt($(this).val()) : splitBets[parseInt(idNum) - 1] = 0;
						}
						else if(scenario == 3) {
							$(this).val().length > 0 ? cornerBets[parseInt(idNum) - 1] = parseInt($(this).val()) : cornerBets[parseInt(idNum) - 1] = 0;
						}
					});
				});























				$("#submit").click(function(e) {
					e.preventDefault();
					var holder = [],
						input = 0;
					for(var i = 0; i < 37; i++) {
						holder.push($("#pos" + i).val() != "" ? parseInt($("#pos" + i).val()) : 0);
					}
					holder.push($("#pos00").val() != "" ? parseInt($("#pos00").val()) : 0);
					holder.push(
						$("#posA").val() != "" ? parseInt($("#posA").val()) : 0,
						$("#posB").val() != "" ? parseInt($("#posB").val()) : 0,
						$("#posC").val() != "" ? parseInt($("#posC").val()) : 0,
						$("#posD").val() != "" ? parseInt($("#posD").val()) : 0,
						$("#posE").val() != "" ? parseInt($("#posE").val()) : 0,
						$("#posF").val() != "" ? parseInt($("#posF").val()) : 0,
						$("#posG").val() != "" ? parseInt($("#posG").val()) : 0,
						$("#posH").val() != "" ? parseInt($("#posH").val()) : 0,
						$("#posI").val() != "" ? parseInt($("#posI").val()) : 0,
						$("#posJ").val() != "" ? parseInt($("#posJ").val()) : 0,
						$("#posK").val() != "" ? parseInt($("#posK").val()) : 0,
						$("#posL").val() != "" ? parseInt($("#posL").val()) : 0,
					);
					input = holder.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
					
					var output = 0,
						result = [];

					result.push({"case": "00", "output": 35 * holder[37], "profit": (35 * holder[37]) - input});

					for(var i = 0; i < 37; i++) {
						if(i == 0) {
							result.push({"case": "0", "output": 35 * holder[0], "profit": (35 * holder[0]) - input});
						}
					}
				});

			});
		});
	};

	return exports;
});