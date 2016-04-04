var gulp = require("gulp");

gulp.task("default", ["compile-framework", "package-module", "minify-module"]);