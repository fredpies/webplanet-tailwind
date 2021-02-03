import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

export default {

    input: 'src/js/script.js',
    output: {
        file: 'dist/js/script.js',
        format: 'iife',
        banner: '/** Copyright by WebPlanet Design 2020 All rights reserved. */'
    },
    plugins: [

        babel({ babelHelpers: 'bundled' }),
        process.env.NODE_ENV === 'production' ? terser() : undefined
    ]

}