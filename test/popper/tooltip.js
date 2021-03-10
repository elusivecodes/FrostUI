const assert = require('assert');
const { exec, loadCSS } = require('../setup');

describe('popper tooltip', function() {

    beforeEach(async function() {
        await loadCSS();
        await exec(_ => {
            dom.setHTML(
                document.body,
                ''
            );
            window.scrollTo(250, 520);
        });
    });

    describe('placement/position options', function() {

        it('works with top/start');
        it('works with top/center');
        it('works with top/end');
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