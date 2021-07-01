define(["jquery", "math", "app/functions"], ($, Math, functions) => {
	var exports = {};

	exports.add_listeners = router => {
		router.addRouteListener("def", (toState, fromState) => {
			$.get("/client/content.html").done(data => {
				$("body").empty();
				$("body").append(data);
				$("select").material_select();
			});
		});
	};

	return exports;
});