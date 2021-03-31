const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper popover (fixed)', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div class="text-center" style="padding: 1600px 1200px;">' +
                '<button id="popoverToggle" class="btn btn-secondary" role="button" data-ui-title="Title" data-ui-content="This is the popover content." style="position: fixed; top: 300px; left: 350px;">Popover</button>' +
                '</div>'
            );
            dom.setScroll(document, 850, 1300);
        });
    });

    describe('placement/position options', function() {

        it('works with top/start', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/top-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1513px, 0px)'
            );
        });

        it('works with top/center', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/top-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1135px, 1513px, 0px)'
            );
        });

        it('works with top/end', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/top-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1070px, 1513px, 0px)'
            );
        });

        it('works with right/start', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/right-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1290px, 1600px, 0px)'
            );
        });

        it('works with right/center', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/right-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1290px, 1576px, 0px)'
            );
        });

        it('works with right/end', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/right-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1290px, 1553px, 0px)'
            );
        });

        it('works with bottom/start', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/bottom-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it('works with bottom/center', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/bottom-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1135px, 1640px, 0px)'
            );
        });

        it('works with bottom/end', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/bottom-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1070px, 1640px, 0px)'
            );
        });

        it('works with left/start', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/left-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(980px, 1600px, 0px)'
            );
        });

        it('works with left/center', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/left-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(980px, 1576px, 0px)'
            );
        });

        it('works with left/end', async function() {
            await exec(_ => {
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/position-fixed/left-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(980px, 1553px, 0px)'
            );
        });

    });

});