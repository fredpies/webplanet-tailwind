const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = {

  plugins: [

    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-responsive-font'),
    require('tailwindcss'),
    // process.env.NODE_ENV === 'production' &&
    purgecss({
      content: ['dist/**/*.html'],
      css: ['dist/main.css'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }),
      cssnano({
        preset: 'default'
      })

  ]

};