# Web Vendor Manager
a lightweight task oriented manager that will manage // install web vendors into your application in a few lines of code


## USAGE

The following will programatically pull the neccasary files from `node_modules` and apply them to whatever output directory that is set in the options.

First run the following `npm i bootstrap font-awesome`

Then configure a gulp task (or however you perform build tasks) similar to the following:

gulpfile.js
```javascript
let webvendor = require('@isaacadams/webvendor');

gulp.task('vendors', function() {
    let opts = {
        html: "index.html",
        output: "dist/public/vendors"
    }
    
    return webvendor(opts)
        .addBootstrap()
        .addFontAwesome()
        .deploy();
});
```

bootstap and font awesome files can now be referenced in dist/public/vendors

the following assumes that the "public" folder is set as your server's public static folder

dist/index.html
```html
<head>
    <!-- BOOTSTRAP -->
    <link type="text/css" rel="stylesheet" href="./vendors/bootstrap/bootstrap.min.css" />
    <script src="./vendors/bootstrap/bootstrap.bundle.min.js"></script>
    <!----->

    <!-- FONT AWESOME -->
    <link type="text/css" rel="stylesheet" href="./vendors/font-awesome/fonts/font-awesome.min.css" />
    <!----->
</head>

<body>
    <span class="fa fa-home">I have a font awesome icon!</span>
    <button class="btn btn-primary">I am bootstrapped!</button>
</body>
```

## Future Plans

- inject html references for installed web vendors into index.html automatically
- ability to add packages that aren't pre-defined
- ability to optionally include jquery as a bootstrap dependency