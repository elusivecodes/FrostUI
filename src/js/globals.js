import fQuery from '@fr0st/query';

let $;

if (fQuery !== fQuery.query) {
    globalThis.fQuery = fQuery(globalThis);
} else {
    $ = fQuery;
}

const document = $.getContext();
const window = $.getWindow();

export {
    $,
    document,
    window,
};
