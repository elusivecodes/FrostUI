import fQuery from '@fr0st/query';

let $;

if (fQuery !== fQuery.query) {
    $ = fQuery(globalThis);
} else {
    $ = fQuery;
}

if (!('fQuery' in globalThis)) {
    globalThis.fQuery = $;
}

const document = $.getContext();
const window = $.getWindow();

export {
    $,
    document,
    window,
};
