const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync =  require('browser-sync').create();


// Sass Task
function sassTask(){
    return src('app/scss/style.scss', { sourcemaps: true})
        .pipe(sass())
        .pipe(postcss([cssnano]))
        .pipe(dest('dist', {sourcemaps: '.'}));
}

//JavaScript Task
function javaScriptTask() {
    return src('app/js/app.js', {sourcemaps: true})
        .pipe(terser())
        .pipe(dest('dist', {sourcemaps: '.'}));
}

//BrowserSync Tasks
function browserSyncTask(cb) {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

//Watch Task
function watchTask(){
    watch('*.html', browserSyncReload);
    watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(sassTask, javaScriptTask, browserSyncReload));
}

//Default Gulp Tasks
exports.default = series(
    sassTask,
    javaScriptTask,
    browserSyncTask,
    watchTask
)