var postcss = require('postcss');
var postcssImport = require('postcss-import');
var fs = require('fs');

var plugin = require('../');
var css = fs.readFileSync('./__tests__/fixtures/input.css', 'utf8');
var options = {
    paths: [
        './__tests__/fixtures/_global.css',
        './__tests__/fixtures/global1/',
        './__tests__/fixtures/global2/'
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
        '@import "__tests__/fixtures/_global.css";\n' +
        '@import "__tests__/fixtures/global1/a.css";\n' +
        '@import "__tests__/fixtures/global1/b.css";\n' +
        '@import "__tests__/fixtures/global2/a.css";\n' +
        '.a { color: #111; }\n',
        [plugin(options)]
    );
});

it('should be equal after atImport', () => {
    return run(
        '.a { color: #003; }\n' +
        '.a { color: #000; }\n' +
        '.a { color: #001; }\n' +
        '.b { background: red; }\n' +
        '.a { color: #111; }\n',
        [ plugin(options), postcssImport() ]
    );
});
