export default libraries = {
    fs: require("fs"),
    path: require('path'),
    process: require('child_process'),
    gulp: require('gulp'),
    concat: require('gulp-concat'),
    terser: require('gulp-terser'),
    rimraf: require("rimraf"),
    glob: require('glob'),
    merge: require('merge-stream'),
    eventstream: require('event-stream')
};