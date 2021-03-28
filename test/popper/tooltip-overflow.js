const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper tooltip (overflow)', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div id="scroll" style="position: relative; overflow: auto; width: 100vw; height: 100vh;">' +
                '<div class="text-center" style="padding: 1600px 1200px;">' +
                '<button id="tooltipToggle" class="btn btn-secondary" role="button" data-ui-title="This is a tooltip.">Tooltip</button>' +
                '</div>' +
                '</div>'
            );
            dom.setScroll('#scroll', 850, 1300);
        });
    });

    describe('placement/position options', function() {

        it('works with auto placement (top)', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1100);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement-auto/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1566px, 0px)'
            );
        });

        it('works with auto placement (right)', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1050);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement-auto/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1602px, 0px)'
            );
        });

        it('works with auto placement (bottom)', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1500);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement-auto/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with auto placement (left)', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 650);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement-auto/left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1602px, 0px)'
            );
        });

        it('works with top/start', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/top-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1566px, 0px)'
            );
        });

        it('works with top/center', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/top-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1566px, 0px)'
            );
        });

        it('works with top/end', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/top-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1566px, 0px)'
            );
        });

        it('works with right/start', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/right-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with right/center', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/right-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1602px, 0px)'
            );
        });

        it('works with right/end', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/right-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1605px, 0px)'
            );
        });

        it('works with bottom/start', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/bottom-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1639px, 0px)'
            );
        });

        it('works with bottom/center', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/bottom-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with bottom/end', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/bottom-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1639px, 0px)'
            );
        });

        it('works with left/start', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/left-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1600px, 0px)'
            );
        });

        it('works with left/center', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/left-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1602px, 0px)'
            );
        });

        it('works with left/end', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement/left-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1605px, 0px)'
            );
        });

    });

    describe('placement flip', function() {

        it('works with top/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1570);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement-flip/top-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with right/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 580);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement-flip/right-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1602px, 0px)'
            );
        });

        it('works with bottom/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1065);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-placement-flip/bottom-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1566px, 0px)'
            );
        });

        it('works with left/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1100);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
                return dom.getStyle('.tooltip', 'transform');
            });
            await screenshot('./screens/tooltip/overflow-placement-flip/left-center-left.jpeg');

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
                dom.setScrollX('#scroll', 470);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/top-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1566px, 0px)'
            );
        });

        it('works with top/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 470);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/top-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1566px, 0px)'
            );
        });

        it('works with top/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
                return dom.getStyle('.tooltip', 'transform');
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/top-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1566px, 0px)'
            );
        });

        it('works with top/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/top-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1566px, 0px)'
            );
        });

        it('works with right/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1025);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/right-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with right/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/right-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1605px, 0px)'
            );
        });

        it('works with right/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1025);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/right-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with right/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/right-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1605px, 0px)'
            );
        });

        it('works with bottom/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 470);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/bottom-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1639px, 0px)'
            );
        });

        it('works with bottom/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 470);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/bottom-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1639px, 0px)'
            );
        });

        it('works with bottom/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/bottom-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1639px, 0px)'
            );
        });

        it('works with bottom/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX('#scroll', 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/bottom-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1639px, 0px)'
            );
        });

        it('works with left/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1025);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/left-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1600px, 0px)'
            );
        });

        it('works with left/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/left-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1605px, 0px)'
            );
        });

        it('works with left/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1025);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/left-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1600px, 0px)'
            );
        });

        it('works with left/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY('#scroll', 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/overflow-position-clamp/left-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1605px, 0px)'
            );
        });

    });

});