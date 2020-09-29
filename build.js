const path = require('path');
const fs = require('fs');
const filepath = require('filepath');
const terser = require('terser');
const less = require('less');
const cssmin = require('cssmin');

const srcFolder = 'src';
const distFolder = 'dist';

const name = 'frost-ui';

// create dist folder if it doesn't exist
if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder);
}

// load files and wrapper
let bundleWrapper, wrapper;
const files = [];
const core = fs.readFileSync('./node_modules/frostcore/dist/frost-core.js');
const dom = fs.readFileSync('./node_modules/frostdom/dist/frost-dom.js');

filepath.create(srcFolder).recurse(fullPath => {
    if (!fullPath.isFile()) {
        return;
    }

    if (path.extname(fullPath.path) === '.js') {
        const fileName = path.basename(fullPath.path, '.js');
        const data = fs.readFileSync(fullPath.path, 'utf8');

        if (fileName === 'bundle_wrapper') {
            bundleWrapper = data;
        } else if (fileName === 'wrapper') {
            wrapper = data;
        } else {
            files.push(data);
        }
    }
});

// inject code to wrapper
const code = wrapper.replace(
    '    // {{code}}',
    files.join('\r\n\r\n')
        .replace(
            /^(?!\s*$)/mg,
            ' '.repeat(4)
        )
);

const bundle = bundleWrapper.replace(
    '    // {{code}}',
    _ => [core, dom, code].join('\r\n\r\n')
        .replace(
            /^(?!\s*$)/mg,
            ' '.repeat(4)
        )
);

// minify
const minified = terser.minify(code, {
    ecma: 8,
    compress: {
        ecma: 8
    }
});

const minifiedBundle = terser.minify(bundle, {
    ecma: 8,
    compress: {
        ecma: 8
    }
});

// write files
if (minified.error) {
    console.error(minified.error);
} else {
    fs.writeFileSync(
        path.join(distFolder, name + '.js'),
        code
    );

    fs.writeFileSync(
        path.join(distFolder, name + '.min.js'),
        minified.code
    );
}

if (minifiedBundle.error) {
    console.error(minifiedBundle.error);
} else {
    fs.writeFileSync(
        path.join(distFolder, name + '-bundle.js'),
        bundle
    );

    fs.writeFileSync(
        path.join(distFolder, name + '-bundle.min.js'),
        minifiedBundle.code
    );
}

// css
less.render(
    fs.readFileSync(
        path.join(srcFolder, 'less/wrapper.less')
    ).toString(),
    {
        optimization: 1,
        paths: [path.join(srcFolder, 'less/')]
    }
).then(result => {
    fs.writeFileSync(
        path.join(distFolder, name + '.css'),
        result.css
    );

    fs.writeFileSync(
        path.join(distFolder, name + '.min.css'),
        cssmin(result.css)
    );
}).catch(console.error);