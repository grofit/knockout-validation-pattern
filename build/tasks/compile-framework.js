var paths = require('../paths');
var gulp = require("gulp");
var tsc = require("gulp-typescript");
var webpack = require("webpack-stream");
var exporter = require("gulp-es6-exporter");
var merge2 = require("merge2");

gulp.task("generate-exports", function() {
    return gulp.src([paths.source, "!src/index.ts"])
        .pipe(exporter("index.ts", { root: "src" }))
        .pipe(gulp.dest("src/"));
});

gulp.task("compile-framework", ["generate-exports"], function () {
    var tscStream = gulp.src([paths.source, paths.typings])
        .pipe(tsc({
            module: "commonJS",
            target: "es5",
            declaration: true,
            noImplicitAny: false
        }));

    return merge2([
        tscStream.dts.pipe(gulp.dest(paths.dist + "/typings")),
        tscStream.js.pipe(gulp.dest(paths.working + "/js"))
    ]);
});