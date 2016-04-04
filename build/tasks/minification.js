var paths = require('../paths');
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("minify-module", ["package-module"], function () {
    return gulp.src(paths.dist + "/knockout-validation-pattern.js")
        .pipe(uglify())
        .pipe(rename("knockout-validation-pattern.min.js"))
        .pipe(gulp.dest('dist'));
});

