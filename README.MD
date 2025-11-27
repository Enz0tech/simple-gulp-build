# Простая сборка Gulp

## Структура каталогов  
Вся разработка будет в папке src, там создавайте структуру так. После всё будет собрано в новый каталог dist.  
>src\scripts\main.js  
>src\styles\main.scss

## Инструкция:

1. Скачать все файлы в любую директорию.  
2. Ввести в терминале команду: npm i (должен быть установлен node.js).  
3. Создать каталог src и файлы в папке src используя подсказку сверху, где script с расширением .js, а style с расширением .less.  
4. Выполнить команду gulp в терминале (это запуск таска default, запускается работа сборки).  
5. Писать свой код и наслаждаться готовой сборкой проекта.

## Установленные NPM пакеты
[gulp](https://www.npmjs.com/package/gulp) Сборщик Gulp  
[gulp-less](https://www.npmjs.com/package/gulp-less) Компиляция Less файлов, вызов заккоментирован в функции styles() для работы SASS(SCSS)  
[gulp-sass](https://www.npmjs.com/package/gulp-sass) Компиляция SASS(SCSS) файлов  
[gulp-typescript](https://www.npmjs.com/package/gulp-typescript) TypeScript  
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) Сжатие и оптимизация JavaScript кода  
[gulp-babel](https://www.npmjs.com/package/gulp-babel) Преобразует JavaScript в старый стандарт  
[@babel/core](https://www.npmjs.com/package/@babel/core) Ядро Babel  
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) Минификация и оптимизация CSS файлов  
[del](https://www.npmjs.com/package/del/v/6.0.0) Удаление каталогов и файлов  
[gulp-concat](https://www.npmjs.com/package/gulp-concat) Объединение нескольких файлов в один  
[gulp-rename](https://www.npmjs.com/package/gulp-rename) Переименовывает файлы  
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) Показывает пути стилей и пути скриптов к файлу в инструментах разработчика  
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer/v/6.1.0) Автопрефиксер кода CSS для поддержки разных браузеров  
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin/v/7.0.0) Сжатие изображений  
[gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) Минификация html  
[gulp-size](https://www.npmjs.com/package/gulp-size/v/4.0.0) Показывает размеры файлов  
[gulp-browserSync](https://browsersync.io/docs/gulp) Запуск своего локального сервера с отслеживанием изменений в файлах  