const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper popover (overflow/window)', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div style="width: calc(100vw + 1800px); padding: 1300px 900px;">' +
                '<div id="scroll" style="position: relative; overflow: auto; width: 100vw; height: 100vh;">' +
                '<div class="text-center" style="padding: 1600px 1200px;">' +
                '<button id="popoverToggle" class="btn btn-secondary" role="button" data-ui-title="Title" data-ui-content="This is the popover content.">Popover</button>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            dom.setScroll(document, 900, 1300);
            dom.setScroll('#scroll', 900, 1300);
        });
    });

    describe('placement flip', function() {

        it('works with top/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1520);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-placement-flip/top-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1135px, 1640px, 0px)'
            );
        });

        it('works with right/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 600);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-placement-flip/right-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(980px, 1576px, 0px)'
            );
        });

        it('works with bottom/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1115);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-placement-flip/bottom-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1135px, 1513px, 0px)'
            );
        });

        it('works with left/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1100);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                popover.show();
                return dom.getStyle('.popover', 'transform');
            });
            await screenshot('./screens/popover/overflow-window-placement-flip/left-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1290px, 1576px, 0px)'
            );
        });

    });

    describe('position clamp', function() {

        it('works with top/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 480);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/top-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1069px, 1513px, 0px)'
            );
        });

        it('works with top/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 480);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/top-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1069px, 1513px, 0px)'
            );
        });

        it('works with top/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                popover.show();
                return dom.getStyle('.popover', 'transform');
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/top-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1513px, 0px)'
            );
        });

        it('works with top/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/top-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1513px, 0px)'
            );
        });

        it('works with right/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1035);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/right-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1290px, 1553px, 0px)'
            );
        });

        it('works with right/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1600);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/right-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1290px, 1600px, 0px)'
            );
        });

        it('works with right/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1035);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/right-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1290px, 1553px, 0px)'
            );
        });

        it('works with right/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1600);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/right-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1290px, 1600px, 0px)'
            );
        });

        it('works with bottom/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 480);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/bottom-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1069px, 1640px, 0px)'
            );
        });

        it('works with bottom/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 480);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/bottom-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1069px, 1640px, 0px)'
            );
        });

        it('works with bottom/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/bottom-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it('works with bottom/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/bottom-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it('works with left/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1035);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/left-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(980px, 1553px, 0px)'
            );
        });

        it('works with left/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1600);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/left-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(980px, 1600px, 0px)'
            );
        });

        it('works with left/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1035);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/left-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(980px, 1553px, 0px)'
            );
        });

        it('works with left/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1600);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-window-position-clamp/left-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(980px, 1600px, 0px)'
            );
        });

    });

});