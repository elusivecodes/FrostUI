const assert = require('assert');
const { exec, loadCSS } = require('../setup');
const { waitFor } = require('../helpers');

describe('popper dropdown', function() {

    beforeEach(async function() {
        await loadCSS();
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div class="text-center" style="padding: 800px 600px;">' +
                '<div class="dropdown">' +
                '<button id="dropdownToggle" class="btn btn-secondary dropdown-toggle" role="button" data-ui-toggle="dropdown">Dropdown</button>' +
                '<div class="dropdown-menu">' +
                '<button class="dropdown-item">Action</button>' +
                '<button class="dropdown-item">Action</button>' +
                '<button class="dropdown-item">Action</button>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            window.scrollTo(250, 520);
        });
    });

    describe('placement/position options', function() {

        it('works with top/start', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        placement: 'top',
                        position: 'start',
                        duration: 0
                    });
                    dropdown.show();
                    return dom.css('.dropdown-menu', 'transform');
                }),
                'matrix(1, 0, 0, 1, 600, 673)'
            );
        });

        it('works with top/center', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        placement: 'top',
                        position: 'center',
                        duration: 0
                    });
                    dropdown.show();
                    return dom.css('.dropdown-menu', 'transform');
                }),
                'matrix(1, 0, 0, 1, 572, 673)'
            );
        });

        it('works with top/end', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        placement: 'top',
                        position: 'end',
                        duration: 0
                    });
                    dropdown.show();
                    return dom.css('.dropdown-menu', 'transform');
                }),
                'matrix(1, 0, 0, 1, 545, 673)'
            );
        });

        it('works with right/start');
        it('works with right/center');
        it('works with right/end');
        it('works with bottom/start');
        it('works with bottom/center');
        it('works with bottom/end');
        it('works with left/start');
        it('works with left/center');
        it('works with left/end');

    });

    describe('edges', function() {

        it('works with top/start and right edge');
        it('works with top/center and top edge');
        it('works with top/center and right edge');
        it('works with top/center and left edge');
        it('works with top/end and left edge');
        it('works with right/start and bottom edge');
        it('works with right/center and top edge');
        it('works with right/center and right edge');
        it('works with right/center and bottom edge');
        it('works with right/end and top edge');
        it('works with bottom/start and right edge');
        it('works with bottom/center and right edge');
        it('works with bottom/center and bottom edge');
        it('works with bottom/center and left edge');
        it('works with bottom/end and left edge');
        it('works with left/start and bottom edge');
        it('works with left/center and top edge');
        it('works with left/center and bottom edge');
        it('works with left/center and left edge');
        it('works with left/end and top edge');

    });

    describe('fixed option', function() {

        it('works with top edge');
        it('works with right edge');
        it('works with bottom edge');
        it('works with left edge');

    });

    describe('spacing option', function() {

        it('withs with spacing and top');
        it('withs with spacing and right');
        it('withs with spacing and bottom');
        it('withs with spacing and left');

    });

    describe('minContact option', function() {

        it('withs with minContact and top');
        it('withs with minContact and right');
        it('withs with minContact and bottom');
        it('withs with minContact and left');

    });

    describe('useGpu option', function() {

        it('withs with useGpu and top');
        it('withs with useGpu and right');
        it('withs with useGpu and bottom');
        it('withs with useGpu and left');

    });

});