let { merge, rimraf } = require('./libraries');
import * as gulp from 'gulp';



let e = module.exports;

//path to the folder we want to put all the dependencies in
let vendorFolder = 'wwwroot/vendor/';

e.clean = function (cb) {
    return rimraf(vendorFolder, cb);
};

e.files = function () {

    //Just a quicker and consistent way to organize and create package objects
    function CreatePack(name, glob) {
        let self = {
            name: name,
            glob: typeof (glob) === 'string' ? [glob] : glob
        };

        self.glob = self.glob.map((val, i, arr) => {
            return "node_modules/" + name + "/" + val;
        });

        return self;
    }

    //List of dependencies that we want to reference in the frontend
    let dependencies = [
        CreatePack('bootstrap', '**/*/js/bootstrap.min.js'),
        CreatePack('jquery', 'dist/*'),
        CreatePack('popper.js', 'dist/umd/*'),
        CreatePack('jquery-ajax-unobtrusive', 'dist/*'),
        CreatePack('jquery-validation', 'dist/*'),
        CreatePack('jquery-validation-unobtrusive', 'dist/*'),
        CreatePack('twbs-pagination', '**/*.min.js'),
        CreatePack('jquery-ui-dist', ['jquery-ui.js', 'jquery-ui.css', '**/images/*']),
        CreatePack('@fortawesome/fontawesome-free', '**/*')
    ];

    var streams = [];

    for (let i = 0; i < dependencies.length; i++) {
        let pack = dependencies[i];

        console.log("Prepping Scripts for: " + pack.name);
        streams.push(
            gulp.src(pack.glob)
                .pipe(gulp.dest(vendorFolder + pack.name + "/"))
        );
    }

    return merge(streams);
};
