var postcss = require('postcss');
var fs = require('fs');
var path = require('path');

module.exports = postcss.plugin('postcss-autoimport', function (opts) {
    opts = opts || {};
    opts.paths = opts.paths || [];

    return function (root) {
        opts.paths.reverse().forEach(function (resourcePath) {
            var isDirectory = fs.statSync(resourcePath).isDirectory();
            var files = isDirectory ?
                fs.readdirSync(resourcePath).reverse() :
                [resourcePath];

            files.forEach(function (file) {
                root.prepend({
                    name: 'import',
                    params: '"' + path.join(
                        isDirectory ? resourcePath : '',
                        file
                    ) + '"'
                });
            });
        });
    };
});
