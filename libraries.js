let r = require;

module.exports = {
    fs: r("fs"),
    path: r('path'),
    process: r('child_process'),
    gulp: r('gulp'),
    babel: r("gulp-babel"),
    concat: r('gulp-concat'),
    terser: r('gulp-terser'),
    rimraf: r("rimraf"),
    glob: r('glob'),
    merge: r('merge-stream'),
    eventstream: r('event-stream')
};