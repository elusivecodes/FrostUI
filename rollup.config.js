'use strict';

import { nodeResolve } from '@rollup/plugin-node-resolve';

const BUNDLE = process.env.BUNDLE === 'true';

const external = ['@fr0st/query'];

const globals = {
    '@fr0st/query': 'fQuery',
};

let file = 'dist/frost-ui.js';

if (BUNDLE) {
    file = 'dist/frost-ui-bundle.js';
    external.pop();
}

export default {
    input: 'src/js/index.js',
    output: {
        file,
        format: 'umd',
        globals,
        name: 'UI',
        sourcemap: true,
    },
    external,
    plugins: [nodeResolve()],
};
