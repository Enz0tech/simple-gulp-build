const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const cleanCss = require('gulp-clean-css')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')
const browserSync = require('browser-sync').create()
const del = require('del')

// Задача с указанием путей в каталоге dist. То как они будут лежать там и в каком порядке и в дальнейшем эти пути постоянно используются в других задачах
const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist'
  },
  styles: {
    src: ['src/styles/**/*.sass', 'src/styles/**/*.scss', 'src/styles/**/*.less'],
    dest: 'dist/css/'
  },
  scripts: {
    src: ['src/scripts/**/*.ts', 'src/scripts/**/*.js'],
    dest: 'dist/js/'
  },
  images: {
    src: 'src/img/**',
    dest: 'dist/img'
  }
}

// Задача для очистки, удаление всей папки dist, кроме папки с изображениями.
function clean() {
  return del(['dist/*', '!dist/img'])
}

// Минификация html
function html() {
  return gulp.src(paths.html.src)
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(size())
  .pipe(gulp.dest(paths.html.dest))
  .pipe(browserSync.stream())
}

// Задача для добавления изменений из style.less в dist style.css и создание минифицированной версии
function styles() {
  return gulp.src(paths.styles.src)
  .pipe(sourcemaps.init())
  // .pipe(less())  //Приостановили, чтобы работал SCSS
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCss({
    level: 2
  }))
  .pipe(rename({
    basename: 'main',
    suffix: '.min'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(size())
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(browserSync.stream())
}

// Задача для обработки скриптов
function scripts() {
  return gulp.src(paths.scripts.src)
  .pipe(sourcemaps.init())
  .pipe(ts({
    noImplicitAny: true,
    outFile: 'output.js'
  }))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(size())
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(browserSync.stream())
}

// Функция для сжатия изображений
function img() {
  return gulp.src(paths.images.src, {encoding: false})
  .pipe(imagemin())
  .pipe(size())
  .pipe(gulp.dest(paths.images.dest))
}

// Задача для отслежвания изменений в файлах (разметки, стили, js, img). Ctrl+C по терминалу завершает задачу отслеживания.
function watch() {
  browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
  gulp.watch(paths.html.dest).on('change', browserSync.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.images.src, img)
}

// Задача для вызова билда: очистка, добавление стилей в dist, отслеживание
const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch)

exports.clean = clean
exports.img = img
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build