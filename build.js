const path = require('path');
const fs = require('fs');
const filepath = require('filepath');
const terser = require('terser');
const sass = require('sass');
const postcss = require('postcss');
const cssnano = require('cssnano');

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
terser.minify(code, {
    ecma: 8,
    compress: {
        ecma: 8
    }
}).then(minified => {
    fs.writeFileSync(
        path.join(distFolder, name + '.js'),
        code
    );

    fs.writeFileSync(
        path.join(distFolder, name + '.min.js'),
        minified.code
    );
}).catch(error => {
    console.error(error);
});

terser.minify(bundle, {
    ecma: 8,
    compress: {
        ecma: 8
    }
}).then(minified => {
    fs.writeFileSync(
        path.join(distFolder, name + '-bundle.js'),
        bundle
    );

    fs.writeFileSync(
        path.join(distFolder, name + '-bundle.min.js'),
        minified.code
    );
}).catch(error => {
    console.error(error);
});

// css
sass.render({
    file: path.join(srcFolder, 'scss/ui.scss'),
    includePaths: [path.join(srcFolder, 'scss/')],
    outputStyle: 'expanded'
}, (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    const fullPath = path.join(distFolder, name + '.css');
    const minifiedPath = path.join(distFolder, name + '.min.css');

    fs.writeFileSync(
        fullPath,
        result.css.toString()
    );

    postcss([cssnano])
        .process(result.css.toString(), { from: fullPath, to: minifiedPath })
        .then(minified => {
            fs.writeFileSync(
                minifiedPath,
                minified.toString()
            );
        });
});