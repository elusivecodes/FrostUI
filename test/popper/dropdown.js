const { strictEqual } = require('assert');
const assert = require('assert');
const { exec, loadCSS, screenshot } = require('../setup');

describe('popper dropdown', function() {

    beforeEach(async function() {
        await loadCSS();
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div class="text-center" style="padding: 1600px 1200px;">' +
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
            window.scrollTo(850, 1300);
        });
    });

    describe('placement/position options', function() {

        it.only('works with top/start', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/top-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1473px, 0px)'
            );
        });

        it.only('works with top/center', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/top-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1473px, 0px)'
            );
        });

        it.only('works with top/end', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'end',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/top-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1473px, 0px)'
            );
        });

        it.only('works with right/start', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/right-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1600px, 0px)'
            );
        });

        it.only('works with right/center', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/right-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1556px, 0px)'
            );
        });

        it.only('works with right/end', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'end',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/right-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1513px, 0px)'
            );
        });

        it.only('works with bottom/start', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/bottom-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it.only('works with bottom/center', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/bottom-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it.only('works with bottom/end', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'end',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/bottom-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1640px, 0px)'
            );
        });

        it.only('works with left/start', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/left-start.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1600px, 0px)'
            );
        });

        it.only('works with left/center', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/left-center.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1556px, 0px)'
            );
        });

        it.only('works with left/end', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'end',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement/left-end.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1513px, 0px)'
            );
        });

    });

    describe('edges', function() {

        it.only('works with top/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 500);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/top-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1473px, 0px)'
            );
        });

        it.only('works with top/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1600);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/top-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it.only('works with top/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 500);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/top-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1473px, 0px)'
            );
        });

        it.only('works with top/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
                return dom.getStyle('.dropdown-menu', 'transform');
            });
            await screenshot('./screens/dropdown/edges/top-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1473px, 0px)'
            );
        });

        it.only('works with top/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'end',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/top-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1473px, 0px)'
            );
        });

        it.only('works with right/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1035);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/right-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1513px, 0px)'
            );
        });

        it.only('works with right/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1600);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/right-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1600px, 0px)'
            );
        });

        it.only('works with right/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 500);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/right-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1556px, 0px)'
            );
        });

        it.only('works with right/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1035);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/right-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1513px, 0px)'
            );
        });

        it.only('works with right/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1600);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'end',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/right-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1600px, 0px)'
            );
        });

        it.only('works with bottom/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 500);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/bottom-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1640px, 0px)'
            );
        });

        it.only('works with bottom/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 500);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/bottom-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1640px, 0px)'
            );
        });

        it.only('works with bottom/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1035);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/bottom-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1473px, 0px)'
            );
        });

        it.only('works with bottom/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 1200);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/bottom-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it.only('works with bottom/end and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 1200);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'end',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/bottom-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it.only('works with left/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1035);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/left-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1513px, 0px)'
            );
        });

        it.only('works with left/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1600);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/left-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1600px, 0px)'
            );
        });

        it.only('works with left/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1035);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/left-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1513px, 0px)'
            );
        });

        it.only('works with left/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1200);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
                return dom.getStyle('.dropdown-menu', 'transform');
            });
            await screenshot('./screens/dropdown/edges/left-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1556px, 0px)'
            );
        });

        it.only('works with left/end and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1600);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'end',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/edges/left-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1600px, 0px)'
            );
        });

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