var postcss = require('postcss');
var postcssImport = require('postcss-import');
var fs = require('fs');
var path = require('path');
var rootPath = process.cwd();

var plugin = require('../');
var css = fs.readFileSync(path.join(rootPath, '__tests__/css/local/input.css'), 'utf8');
var options = {
    paths: [
        path.join(rootPath, '__tests__/css/common/_global.css'),
        path.join(rootPath, '__tests__/css/common/global1/**/*.css'),
        path.join(rootPath, '__tests__/css/common/global2/**/*.css')
    ]
};

function run(output, plugins) {
    return postcss(plugins)
        .process(css, {
            from: 'input.css'
        })
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('should be equal before atImport', () => {
    return run(
        '@import "__tests__/css/common/_global.css";\n' +
        '@import "__tests__/css/common/global1/a.css";\n' +
        '@import "__tests__/css/common/global1/b.css";\n' +
        '@import "__tests__/css/common/global2/a.css";\n' +
        '.a { color: #111; }\n',
        [plugin(options)]
    );
});

it('should be equal after atImport', () => {
    return run(
        '.b { background: red; }\n' +
        '.a { color: #000; }\n' +
        '.a { color: #001; }\n' +
        '.a { color: #002; }\n' +

        '.a { color: #111; }\n',
        [ plugin(options), postcssImport() ]
    );
});
