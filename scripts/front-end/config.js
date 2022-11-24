require.config({
    baseUrl: "",
    paths: {
        app: "/scripts/front-end",
        lib: "/node_modules",
        jquery: "/node_modules/jquery/dist/jquery.min",
        materialize: "/bower_components/materializecss-amd/dist/materialize.amd.min",
        router5: "/node_modules/router5/dist/amd/router5.min",
        math: "/node_modules/mathjs/lib/browser/math"
    },
    shim: {
        materialize: {
            exports: "Materialize",
            deps: ["jquery"]
        }
    }
});

require(["app/main"]);