/**
 * FrostUI v1.0
 * https://github.com/elusivecodes/FrostUI
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory;
    } else {
        Object.assign(global, factory(global));
    }

})(window, function(window) {
    'use strict';

    if (!window) {
        throw new Error('FrostUI requires a Window.');
    }

    if (!('DOM' in window)) {
        throw new Error('FrostUI requires FrostDOM.');
    }

    const Core = window.Core;
    const DOM = window.DOM;
    const dom = window.dom;
    const QuerySet = window.QuerySet;
    const document = window.document;

    const UI = {};

    // {{code}}
    return {
        UI
    };
});