const path = require('path');
const fg = require('fast-glob');

module.exports = (opts = {}) => {
    opts.paths = opts.paths || [];
    opts.root = opts.root || process.cwd();

    const files = fg.sync(opts.paths);
    const importedFiles = files.reverse().map(file => path.relative(opts.root, file));

    return {
        postcssPlugin: 'postcss-autoimport',
        Once (root) {
            importedFiles.forEach(file => {
                root.prepend({
                    name: 'import',
                    params: `"${file}"`
                });
            });
        }
    };
};

module.exports.postcss = true;
