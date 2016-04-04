var paths = require('../paths');
var gulp = require("gulp");
var webpack = require("webpack-stream");

gulp.task('package-module', ["compile-framework"], function () {
    return gulp.src([paths.working + "/js/index.js"])
        .pipe(webpack({
            output: {
                entry: "index.js",
                filename: "knockout-validation-pattern.js",
                library: "KnockoutValidationPattern",
                libraryTarget: "umd"
            },
            module: {
                loaders: [
                    { test: require.resolve("knockout-es5"), loader: "expose?ko" },
                    { test: require.resolve("knockout.validation"), loader: "expose?ko.validation" },
                    { test: require.resolve("bluebird"), loader: "expose?Promise" },
                    { test: require.resolve("sugar"), loader: "expose?sugar" }
                ]
            }
        }))
        .pipe(gulp.dest(paths.dist));
});

