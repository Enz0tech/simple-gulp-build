const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCss = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const del = require('del')

// Задача с указанием путей в каталоге dist. То как они будут лежать там и в каком порядке и в дальнейшем эти пути постоянно используются в других задачах
const paths = {
  styles: {
    src: 'src/styles/**/*.less',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/'
  }
}

// Задача для очистки, удаление всей папки dist
function clean() {
  return del(['dist'])
}

// Задача для добавления изменений из style.less в dist style.css и создание минифицированной версии
function styles() {
  return gulp.src(paths.styles.src)
  .pipe(less())
  .pipe(cleanCss())
  .pipe(rename({
    basename: 'main',
    suffix: '.min'
  }))
  .pipe(gulp.dest(paths.styles.dest))
}

// Задача для обработки скриптов
function scripts() {
  return gulp.src(paths.scripts.src, {
    sourcemaps: true
  })
  .pipe(babel())
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest(paths.scripts.dest))
}

// Задача для отслежвания изменений в style.less. Ctrl+C по терминалу завершает задачу отслеживания.
function watch() {
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
}

// Задача для вызова билда: очистка, добавление стилей в dist, отслеживание
const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build