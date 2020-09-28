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
const addFile = require(path.join(__dirname, "build", "routes",'addFile'));
const add_sale_item_base = require(path.join(__dirname, "build", "routes",'add_sale_item_base'));
const fileMiddleware = require('./build/models/file_middleware');

//const users_sign_in = require(path.join(__dirname, "build", "routes",'authorization'));
//const add_to_cart = require(path.join(__dirname, "build", "routes",'sale_item'));

app.use(express.static('./build'));
app.use(express.static('build/images/item_photos'));
app.set("view engine", "pug");
app.set("view", "pages");


app.use('/addUser', addUsers);
app.use('/add_sale_item_base', add_sale_item_base);
app.use( fileMiddleware.single('multi_choice_img'));
app.use('/add_item_photos', addFile);

//app.use('/autorization', users_sign_in);
//app.use('/addtocart', add_to_cart);



app.get('/', (req,res) => [
    res.sendfile(path.join(__dirname,"build","pages",'index.html'))
]);

app.get('/sale_page', (req,res) => [
    res.sendfile(path.join(__dirname,"build","pages",'sale_page.html'))
]);

app.get('/admin', (req,res) => [
    res.sendfile(path.join(__dirname,"build","pages",'admin.html'))
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

gulp.task('template:sale', function buildHTML() {
    return gulp.src("source/template/admin.pug")
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
        .pipe(gulp.dest('build/images'))

});

gulp.task('copy:item_photos', function() {
    return gulp.src('./source/item_photos/**/*.*')
        .pipe(gulp.dest('build/images/item_photos'))
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images','copy:item_photos'));

/* ------------ js ------------- */

gulp.task('js', function () {
    return gulp.src(['./source/js/init.js','./source/js/navigation.js','./source/js/hero.js','./source/js/admin_page.js','./source/js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('js_routes', function () {
    return gulp.src(['./source/routes/addUser.js', './source/routes/addFile.js', './source/routes/add_sale_item_base.js'])
        // .pipe(sourcemaps.init())
        // .pipe(concat('addUser.min.js'))
        // .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/routes'));
});

gulp.task('js_models', function () {
    return gulp.src(['./source/models/add_users.js','./source/models/file.js','./source/models/file_middleware.js','./source/models/add_sale_item_base.js'])
        // .pipe(sourcemaps.init())
        // .pipe(concat('add_users.min.js'))
        // .pipe(uglify())
        // .pipe(sourcemaps.write())
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
