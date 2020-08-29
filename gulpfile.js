const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');

const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
app.use(express.urlencoded({extended:true}));

const addUsers = require(path.join(__dirname, "build", "routes",'addUser'));
//const users_sign_in = require(path.join(__dirname, "build", "routes",'authorization'));
//const add_to_cart = require(path.join(__dirname, "build", "routes",'sale_item'));

app.use(express.static('./build'));
app.set("view engine", "pug");
app.set("view", "pages");

app.use('/addUser', addUsers);
//app.use('/autorization', users_sign_in);
//app.use('/addtocart', add_to_cart);

app.get('/', (req,res) => [
    res.sendfile(path.join(__dirname,"build","pages",'index.html'))
]);

app.get('/sale_page', (req,res) => [
    res.sendfile(path.join(__dirname,"build","pages",'sale_page.html'))
]);

async function start_server(){

    const url = 'mongodb+srv://admin_site:r2d2c3po@cluster0.ce3gh.gcp.mongodb.net/shop_Nataly_Bloom';
    await mongoose.connect(url,{
        useNewUrlParser: true}
        )
    app.listen('3001');

}

start_server();


/* -------- Server  -------- */
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 3000,
            baseDir: "build",
            notify: true
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ------------ Pug compile ------------- */
gulp.task('template:compile', function buildHTML() {
    return gulp.src("source/template/index.pug")
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build/pages/'))
});

gulp.task('template:sale', function buildHTML() {
    return gulp.src("source/template/sale_page.pug")
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build/pages/'))
});

/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});

/* ------------ Sprite ------------- */
gulp.task('sprite', function(cb) {
    const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.scss'
    }));

    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});

/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
    return rimraf('build', cb);
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function() {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:images', function() {
    return gulp.src('./source/images/**/*.*','./source/images/carusel/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));


/* ------------ js ------------- */

gulp.task('js', function () {
    return gulp.src(['./source/js/init.js','./source/js/navigation.js','./source/js/hero.js','./source/js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('js_routes', function () {
    return gulp.src(['./source/routes/addUser.js', './source/routes/authorization.js', './source/routes/sale_item.js'])
        // .pipe(sourcemaps.init())
        // .pipe(concat('addUser.min.js'))
        // .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/routes'));
});

gulp.task('js_models', function () {
    return gulp.src(['./source/models/add_users.js'])  //,'./source/models/sale_item.js'
        .pipe(sourcemaps.init())
        .pipe(concat('add_users.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/models'));
});

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
    gulp.watch('source/template/**/*.pug', gulp.series('template:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
    gulp.watch('source/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('template:compile', 'template:sale', 'styles:compile', 'js','js_models','js_routes', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
    )
);
