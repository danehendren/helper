var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();

gulp.task("babel", function() {
  gulp.src("./js/*.js")
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest(''))
});


gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./js/*.js", ['babel']);

  gulp.watch("./all.js").on("change", browserSync.reload);
  gulp.watch("./index.html").on("change", browserSync.reload);
  gulp.watch("./style.css").on("change", browserSync.reload);

})

gulp.task("default", ["serve"]);