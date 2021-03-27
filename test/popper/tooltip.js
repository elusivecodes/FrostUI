const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper tooltip', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div class="text-center" style="padding: 1600px 1200px;">' +
                '<button id="tooltipToggle" class="btn btn-secondary" role="button" data-ui-title="This is a tooltip.">Tooltip</button>' +
                '</div>'
            );
            dom.setScroll(window, 850, 1300);
        });
    });

    describe('#update', function() {

        it('updates the popper position', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        placement: 'top',
                        position: 'center',
                        duration: 0
                    });
                    tooltip.show();
                    dom.setScrollY(document, 1570);
                    tooltip.update();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('updates the popper position (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#tooltipToggle').tooltip({
                        placement: 'top',
                        position: 'center',
                        duration: 0
                    }).show();
                    dom.setScrollY(document, 1570);
                    dom.query('#tooltipToggle').tooltip('update');
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

    });

    describe('placement/position options', function() {

        it('works with placement option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        placement: 'bottom',
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with placement option (data-ui-placement)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    dom.setDataset(tooltipToggle, 'uiPlacement', 'bottom');
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with placement option (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#tooltipToggle').tooltip({
                        placement: 'bottom',
                        duration: 0
                    }).show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with position option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        position: 'start',
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with position option (data-ui-position)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    dom.setDataset(tooltipToggle, 'uiPosition', 'start');
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with position option (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#tooltipToggle').tooltip({
                        position: 'start',
                        duration: 0
                    }).show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with auto placement (top)', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1100);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/placement-auto/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1566px, 0px)'
            );
        });

        it('works with auto placement (right)', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1050);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/placement-auto/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1602px, 0px)'
            );
        });

        it('works with auto placement (bottom)', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1500);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/placement-auto/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with auto placement (left)', async function() {
            await exec(_ => {
                dom.setScrollX(document, 650);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/placement-auto/left.jpeg');

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
            await screenshot('./screens/tooltip/placement/top-start.jpeg');

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
            await screenshot('./screens/tooltip/placement/top-center.jpeg');

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
            await screenshot('./screens/tooltip/placement/top-end.jpeg');

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
            await screenshot('./screens/tooltip/placement/right-start.jpeg');

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
            await screenshot('./screens/tooltip/placement/right-center.jpeg');

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
            await screenshot('./screens/tooltip/placement/right-end.jpeg');

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
            await screenshot('./screens/tooltip/placement/bottom-start.jpeg');

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
            await screenshot('./screens/tooltip/placement/bottom-center.jpeg');

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
            await screenshot('./screens/tooltip/placement/bottom-end.jpeg');

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
            await screenshot('./screens/tooltip/placement/left-start.jpeg');

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
            await screenshot('./screens/tooltip/placement/left-center.jpeg');

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
            await screenshot('./screens/tooltip/placement/left-end.jpeg');

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
                dom.setScrollY(document, 1570);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/placement-flip/top-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with right/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 580);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/placement-flip/right-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1602px, 0px)'
            );
        });

        it('works with bottom/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1065);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/placement-flip/bottom-center-bottom.jpeg');

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
            await screenshot('./screens/tooltip/placement-flip/left-center-left.jpeg');

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
                dom.setScrollX(document, 470);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/top-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1566px, 0px)'
            );
        });

        it('works with top/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 470);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/top-center-right.jpeg');

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
            await screenshot('./screens/tooltip/position-clamp/top-center-left.jpeg');

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
            await screenshot('./screens/tooltip/position-clamp/top-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1566px, 0px)'
            );
        });

        it('works with right/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1025);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/right-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with right/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/right-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1605px, 0px)'
            );
        });

        it('works with right/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1025);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/right-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1600px, 0px)'
            );
        });

        it('works with right/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1610);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/right-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1605px, 0px)'
            );
        });

        it('works with bottom/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 470);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/bottom-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1639px, 0px)'
            );
        });

        it('works with bottom/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 470);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/bottom-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1153px, 1639px, 0px)'
            );
        });

        it('works with bottom/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/bottom-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1639px, 0px)'
            );
        });

        it('works with bottom/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 1200);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'end',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/bottom-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1200px, 1639px, 0px)'
            );
        });

        it('works with left/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1025);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/left-start-bottom.jpeg');

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
            await screenshot('./screens/tooltip/position-clamp/left-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1605px, 0px)'
            );
        });

        it('works with left/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1025);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/position-clamp/left-center-bottom.jpeg');

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
            await screenshot('./screens/tooltip/position-clamp/left-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1605px, 0px)'
            );
        });

    });

    describe('fixed option', function() {

        it('works with fixed option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollY(document, 1570);
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        placement: 'top',
                        fixed: true,
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1566px, 0px)'
            );
        });

        it('works with fixed option (data-ui-fixed)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollY(document, 1570);
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    dom.setDataset(tooltipToggle, 'uiFixed', true);
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        placement: 'top',
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1566px, 0px)'
            );
        });

        it('works with fixed option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollY(document, 1570);
                    dom.query('#tooltipToggle').tooltip({
                        placement: 'top',
                        fixed: true,
                        duration: 0
                    }).show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1566px, 0px)'
            );
        });

        it('works with top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1570);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    fixed: true,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/fixed/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1566px, 0px)'
            );
        });

        it('works with right edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 580);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    fixed: true,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/fixed/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1602px, 0px)'
            );
        });

        it('works with bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1065);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    fixed: true,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/fixed/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1639px, 0px)'
            );
        });

        it('works with left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1100);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    fixed: true,
                    duration: 0
                });
                tooltip.show();
                return dom.getStyle('.tooltip', 'transform');
            });
            await screenshot('./screens/tooltip/fixed/left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1602px, 0px)'
            );
        });

    });

    describe('spacing option', function() {

        it('works with spacing option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        spacing: 50,
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1322px, 1602px, 0px)'
            );
        });

        it('works with spacing option (data-ui-spacing)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    dom.setDataset(tooltipToggle, 'uiSpacing', 50);
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1322px, 1602px, 0px)'
            );
        });

        it('works with spacing option (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#tooltipToggle').tooltip({
                        spacing: 50,
                        duration: 0
                    }).show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1322px, 1602px, 0px)'
            );
        });

        it('works with spacing and top', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    spacing: 50,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/spacing/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1518px, 0px)'
            );
        });

        it('works with spacing and right', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    spacing: 50,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/spacing/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1322px, 1602px, 0px)'
            );
        });

        it('works with spacing and bottom', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    spacing: 50,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/spacing/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1176px, 1687px, 0px)'
            );
        });

        it('works with spacing and left', async function() {
            await exec(_ => {
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    spacing: 50,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/spacing/left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1031px, 1602px, 0px)'
            );
        });

    });

    describe('minContact option', function() {

        it('works with minContact option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollX(document, 450);
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        placement: 'top',
                        minContact: 10,
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1131px, 1566px, 0px)'
            );
        });

        it('works with minContact option (data-ui-min-contact)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollX(document, 450);
                    const tooltipToggle = dom.findOne('#tooltipToggle');
                    dom.setDataset(tooltipToggle, 'uiMinContact', 10);
                    const tooltip = UI.Tooltip.init(tooltipToggle, {
                        placement: 'top',
                        duration: 0
                    });
                    tooltip.show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1131px, 1566px, 0px)'
            );
        });

        it('works with minContact option (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollX(document, 450);
                    dom.query('#tooltipToggle').tooltip({
                        placement: 'top',
                        minContact: 10,
                        duration: 0
                    }).show();
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1131px, 1566px, 0px)'
            );
        });

        it('works with minContact and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1620);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'right',
                    position: 'center',
                    minContact: 10,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/min-contact/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1274px, 1620px, 0px)'
            );
        });

        it('works with minContact and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 450);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'top',
                    position: 'center',
                    minContact: 10,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/min-contact/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1131px, 1566px, 0px)'
            );
        });

        it('works with minContact and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1015);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'left',
                    position: 'center',
                    minContact: 10,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/min-contact/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1583px, 0px)'
            );
        });

        it('works with minContact and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1220);
                const tooltipToggle = dom.findOne('#tooltipToggle');
                const tooltip = UI.Tooltip.init(tooltipToggle, {
                    placement: 'bottom',
                    position: 'center',
                    minContact: 10,
                    duration: 0
                });
                tooltip.show();
            });
            await screenshot('./screens/tooltip/min-contact/left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1220px, 1639px, 0px)'
            );
        });

    });

});