const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper tooltip', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div class="text-center" style="padding: 1600px 1200px;">' +
                '<button id="tooltipToggle" class="btn btn-secondary" role="button" data-ui-title="This is a tooltip." style="position: fixed; top: 300px; left: 350px;">Tooltip</button>' +
                '</div>'
            );
            dom.setScroll(window, 850, 1300);
        });
    });

    describe('placement/position options', function() {

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
            await screenshot('./screens/tooltip/position-fixed/top-start.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/top-center.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/top-end.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/right-start.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/right-center.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/right-end.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/bottom-start.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/bottom-center.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/bottom-end.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/left-start.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/left-center.jpeg');

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
            await screenshot('./screens/tooltip/position-fixed/left-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.tooltip', 'transform');
                }),
                'translate3d(1079px, 1605px, 0px)'
            );
        });

    });

});