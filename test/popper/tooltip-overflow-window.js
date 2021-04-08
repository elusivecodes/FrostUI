const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper tooltip (overflow/window)', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div style="width: calc(100vw + 1800px); padding: 1300px 900px;">' +
                '<div id="scroll" style="position: relative; overflow: auto; width: 100vw; height: 100vh;">' +
                '<div class="text-center" style="padding: 1600px 1200px;">' +
                '<button class="btn btn-secondary" id="tooltipToggle" data-ui-title="This is a tooltip." type="button">Tooltip</button>' +
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
                dom.setScrollY(document, 1570);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-placement-flip/top-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with right/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 595);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-placement-flip/right-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1602px, 0px)'
            );
        });

        it('works with bottom/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1080);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-placement-flip/bottom-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1566px, 0px)'
            );
        });

        it('works with left/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1100);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
                return dom.getStyle('.tooltip', 'transform');
            });
            await screenshot('./screens/tooltip/overflow-window-placement-flip/left-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1602px, 0px)'
            );
        });

    });

    describe('position clamp', function() {

        it('works with top/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 485);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/top-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1566px, 0px)'
            );
        });

        it('works with top/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 485);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/top-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1566px, 0px)'
            );
        });

        it('works with top/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
                return dom.getStyle('.tooltip', 'transform');
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/top-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1566px, 0px)'
            );
        });

        it('works with top/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/top-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1566px, 0px)'
            );
        });

        it('works with right/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1040);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/right-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with right/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/right-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1605px, 0px)'
            );
        });

        it('works with right/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1040);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/right-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with right/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/right-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1605px, 0px)'
            );
        });

        it('works with bottom/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 485);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/bottom-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1639px, 0px)'
            );
        });

        it('works with bottom/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 485);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/bottom-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1639px, 0px)'
            );
        });

        it('works with bottom/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/bottom-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1639px, 0px)'
            );
        });

        it('works with bottom/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/bottom-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1639px, 0px)'
            );
        });

        it('works with left/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1040);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/left-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1600px, 0px)'
            );
        });

        it('works with left/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/left-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1605px, 0px)'
            );
        });

        it('works with left/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1040);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/left-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1600px, 0px)'
            );
        });

        it('works with left/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-window-position-clamp/left-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1605px, 0px)'
            );
        });

    });

});