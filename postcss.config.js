const purgecss = require('@fullhuman/postcss-purgecss')({
    // NOTE! Might not work, removes too much (see `main-header:navigation`...)
    content: [
        './src/postcss/**/*.postcss',
    ],
});

const replace = require('postcss-replace')({

});



module.exports = {
    plugins: [
        require('postcss-import'),
        replace,
        require('tailwindcss'),
        require('postcss-preset-env')({ stage: 1 }),
        require('postcss-hexrgba'),
        require('postcss-extend-rule'),
        require('postcss-inline-svg')({ removeFill: true }),
        purgecss,
        //require('cssnano')({ preset: 'default' }),
    ]
}