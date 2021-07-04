define(["jquery", "math", "app/functions"], ($, Math, functions) => {
	var exports = {};

	exports.add_listeners = router => {
		router.addRouteListener("def", (toState, fromState) => {
			$.get("/client/content.html").done(data => {
				$("body").empty();
				$("body").append(data);
				$("select").material_select();

				var dozen1 = [1,2,3,4,5,6,7,8,9,10,11,12],
					dozen2 = [13,14,15,16,17,18,19,20,21,22,23,24],
					dozen3 = [25,26,27,28,29,30,31,32,33,34,35,36],
					col1 = [1,4,7,10,13,16,19,22,25,28,31,34],
					col2 = [2,5,8,11,14,17,20,24,26,29,32,35],
					col3 = [3,6,9,12,15,18,21,24,27,30,33,36],
					red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

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