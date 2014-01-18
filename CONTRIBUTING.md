# Developing #

If you would like to contribute to the **_LEGO Universe News!_ Patcher**, you will want to read this.

## Getting Started ##

* Fork the repository by clicking ![the Fork button](http://i81.servimg.com/u/f81/16/33/06/11/forkme12.png)
* Clone everything onto your computer by running `git clone https://github.com/yourusername/LUNF-patcher.git`
* Read up on the documentation (see [Editing](#editing) below)
* Edit away! You are allowed to edit this project as much as you want, because it is Open Source! Be sure to read the Licenses before you start though.
* Once you finish your work, you can either leave your work on your fork, or if it is a good change that may improve the Minifig Wizard,
submit a [Pull Request](https://github.com/LEGOUniverseNews/LUNF-patcher/pulls) by clicking ![the Pull Request button](http://i81.servimg.com/u/f81/16/33/06/11/pullre10.png)
* If everything checks out, your changes will be merged into the **_LEGO Universe News!_ Patcher**!
* Don't forget to ![Star!](http://i81.servimg.com/u/f81/16/33/06/11/star11.png)

# Editing #

* You are **strongly** encouraged to use [Adobe Brackets w/ Live Development](http://brackets.io)
when developing to ensure everything is rendered and loaded correctly.

## Conventions ##

* HTML5 and CSS3 is utilized in the project, and will only support
    * `<=` IE 10
    * The newest release of Firefox and Chrome (plus the previous one)
    * The newest release of Opera

* Be sure to perform cross-browser tests for the supported browsers.
* Please do not change anything under the `Legacy` folder. That is the previous version of the browser, kept only for older browsers.
* Make sure your code is valid! Use the [W3C Markup Validation Service](http://validator.w3.org) and the [W3C CSS Validation Service](http://jigsaw.w3.org/css-validator/) for your HTML and CSS, respectively.
* [Grunt.js](http://gruntjs.com/) is used to validate JavaScript, in addition to minifying CSS and JavaScript.
You are **strongly** encouraged to run `grunt watch` while editing and to automatically minify the CSS and JavaScript for testing.
