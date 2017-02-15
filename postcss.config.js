module.exports = {
    plugins: [
        require('autoprefixer')({
            browserslist: [
                '> 10% in NL',
                'last 2 versions',
                'ie >= 11'
            ]
        })
    ]
};
