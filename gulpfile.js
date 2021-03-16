const {src, dest, watch, parallel, series} = require('gulp');

const scss         = require('gulp-sass');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');

//Просмотр в браузере
function browsersync() {
    browserSync.init({
        port: process.env.PORT || 5000,
        server: { baseDir: 'app/' }, 
        domain: '0.0.0.0'
    });
}

//Удаление папки Dist
function cleanDist() {
    return del('dist');
}

//Конвертация изображений (сжатие и выгрузка в dist)
function images() {
    return src ('app/images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images'));
}

//Ковертация JS
function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'app/js/main.js'
    ])  
    .pipe(concat('main.min.js')) //Объединение JS файлов и создание одного файла
    .pipe(uglify())              //Сжатие
    .pipe(dest('app/js'))        //Выгрузка в папку
    .pipe(browserSync.stream()); //Обновление браузера
}

//Конвертация Scss в Css 
function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))    //Конвертация SCSS в СSS и сжатие
        .pipe(concat('style.min.css'))              //Создание файла
        .pipe(autoprefixer({                        //Добавление автопрефиксов
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))                      //Выгрузка в папку
        .pipe(browserSync.stream());                //Обновление браузера
}

//Перенос файлов в Dist
function build() {
    return src([            //выбор файлов
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base:'app'})        //выбор корневой папки
    .pipe(dest('dist'));    //Выгрузка в папку
}

//Слежение за изменениями в файлах
function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js','!app/js/main.min.js'], scripts);
    watch('app/*.html').on('change', browserSync.reload);
}

//Назначение команд
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);