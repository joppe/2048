module.exports = {
    plugins: [
        require('autoprefixer')({
            browserslist: [
                '> 10% in NL',
                'Llast 2 versions',
                'ie >= 11'
            ]
        })
    ]
};
