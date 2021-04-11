const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper popover (overflow)', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div id="scroll" style="position: relative; overflow: auto; width: 100vw; height: 100vh;">' +
                '<div class="text-center" style="padding: 1600px 1200px;">' +
                '<button class="btn btn-secondary" id="popoverToggle" data-ui-title="Title" data-ui-content="This is the popover content." type="button">Popover</button>' +
                '</div>' +
                '</div>'
            );
            dom.setScroll('#scroll', 900, 1300);
        });
    });

    describe('placement/position options', function() {

        it('works with auto placement (top)', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1130);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-placement-auto/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1134px, 1520px, 0px)'
            );
        });

        it('works with auto placement (right)', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1050);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-placement-auto/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1281px, 1578px, 0px)'
            );
        });

        it('works with auto placement (bottom)', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1500);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-placement-auto/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1134px, 1637px, 0px)'
            );
        });

        it('works with auto placement (left)', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 665);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-placement-auto/left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(987px, 1578px, 0px)'
            );
        });

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
            await screenshot('./screens/popover/overflow-placement/top-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1520px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/top-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1134px, 1520px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/top-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1068px, 1520px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/right-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1281px, 1600px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/right-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1281px, 1578px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/right-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1281px, 1557px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/bottom-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1637px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/bottom-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1134px, 1637px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/bottom-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1068px, 1637px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/left-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(987px, 1600px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/left-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(987px, 1578px, 0px)'
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
            await screenshot('./screens/popover/overflow-placement/left-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(987px, 1557px, 0px)'
            );
        });

    });

    describe('placement flip', function() {

        it('works with top/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1520);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-placement-flip/top-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1134px, 1637px, 0px)'
            );
        });

        it('works with right/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 615);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-placement-flip/right-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(987px, 1578px, 0px)'
            );
        });

        it('works with bottom/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1130);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-placement-flip/bottom-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1134px, 1520px, 0px)'
            );
        });

        it('works with left/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1100);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                popover.show();
                return dom.getStyle('.popover', 'transform');
            });
            await screenshot('./screens/popover/overflow-placement-flip/left-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1281px, 1578px, 0px)'
            );
        });

    });

    describe('position clamp', function() {

        it('works with top/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 490);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/top-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1068px, 1520px, 0px)'
            );
        });

        it('works with top/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 490);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/top-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1068px, 1520px, 0px)'
            );
        });

        it('works with top/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1200);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                popover.show();
                return dom.getStyle('.popover', 'transform');
            });
            await screenshot('./screens/popover/overflow-position-clamp/top-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1520px, 0px)'
            );
        });

        it('works with top/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1200);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'top',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/top-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1520px, 0px)'
            );
        });

        it('works with right/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1048);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/right-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1281px, 1557px, 0px)'
            );
        });

        it('works with right/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1600);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/right-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1281px, 1600px, 0px)'
            );
        });

        it('works with right/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1048);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/right-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1281px, 1557px, 0px)'
            );
        });

        it('works with right/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1600);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'right',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/right-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1281px, 1600px, 0px)'
            );
        });

        it('works with bottom/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 490);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/bottom-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1068px, 1637px, 0px)'
            );
        });

        it('works with bottom/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 490);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/bottom-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1068px, 1637px, 0px)'
            );
        });

        it('works with bottom/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1200);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/bottom-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1637px, 0px)'
            );
        });

        it('works with bottom/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1200);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'bottom',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/bottom-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(1200px, 1637px, 0px)'
            );
        });

        it('works with left/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1048);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/left-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(987px, 1557px, 0px)'
            );
        });

        it('works with left/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1600);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/left-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(987px, 1600px, 0px)'
            );
        });

        it('works with left/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1048);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/left-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(987px, 1557px, 0px)'
            );
        });

        it('works with left/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1600);
                const popoverToggle = dom.findOne('#popoverToggle');
                const popover = UI.Popover.init(popoverToggle, {
                    placement: 'left',
                    position: 'end',
                    duration: 0
                });
                popover.show();
            });
            await screenshot('./screens/popover/overflow-position-clamp/left-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.popover', 'transform');
                }),
                'translate3d(987px, 1600px, 0px)'
            );
        });

    });

});