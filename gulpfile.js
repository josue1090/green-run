"use strict";

const gulp = require("gulp");
const rimraf = require("gulp-rimraf");
const tslint = require("gulp-tslint");
const shell = require("gulp-shell");

/**
 * Remove build directory.
 */
// gulp.task('clean', function () {
//   return gulp.src(outDir, { read: false })
//     .pipe(rimraf());
// });

function clean() {
  return gulp.src(outDir, { read: false }).pipe(rimraf());
}

/**
 * Lint all custom TypeScript files.
 */
// gulp.task('tslint', () => {
//   return gulp.src('src/**/*.ts')
//     .pipe(tslint({
//       formatter: 'prose'
//     }))
//     .pipe(tslint.report());
// });

function tslintCompile() {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      tslint({
        formatter: "prose",
      })
    )
    .pipe(tslint.report());
}

/**
 * Compile TypeScript.
 */

function compileTS(args, cb) {
  return exec(tscCmd + args, (err, stdout, stderr) => {
    console.log(stdout);

    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
}

// gulp.task('compile', shell.task([
//   'npm run tsc',
// ]))

function compile() {
  return shell.task(["npm run tsc"]);
}

/**
 * Watch for changes in TypeScript
 */
// gulp.task('watch', shell.task([
//   'npm run tsc-watch',
// ]))

function watch() {
  return shell.task(["npm run tsc-watch"]);
}
/**
 * Copy config files
 */
// gulp.task('configs', (cb) => {
//   return gulp.src("src/configurations/*.json")
//     .pipe(gulp.dest('./build/src/configurations'));
// });

function configs() {
  return gulp
    .src("src/configurations/*.json")
    .pipe(gulp.dest("./build/src/configurations"));
}

/**
 * Build the project.
 */

// gulp.task('build', ['tslint', 'compile', 'configs'], () => {
//   console.log('Building the project ...');
// });

// gulp.task('default', ['build']);

exports.build = gulp.parallel(
  // tslintCompile,
  compile,
  configs
);
