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
                '<button id="dropdownToggle" class="btn btn-secondary dropdown-toggle" role="button">Dropdown</button>' +
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

        it('works with top/start', async function() {
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

        it('works with top/center', async function() {
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

        it('works with top/end', async function() {
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

        it('works with right/start', async function() {
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

        it('works with right/center', async function() {
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

        it('works with right/end', async function() {
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

        it('works with bottom/start', async function() {
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

        it('works with bottom/center', async function() {
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

        it('works with bottom/end', async function() {
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

        it('works with left/start', async function() {
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

        it('works with left/center', async function() {
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

        it('works with left/end', async function() {
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

    describe('placement flip', function() {

        it('works with top/center and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1500);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement-flip/top-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it('works with right/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 600);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement-flip/right-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1556px, 0px)'
            );
        });

        it('works with bottom/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1135);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement-flip/bottom-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1473px, 0px)'
            );
        });

        it('works with left/center and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1100);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
                return dom.getStyle('.dropdown-menu', 'transform');
            });
            await screenshot('./screens/dropdown/placement-flip/left-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1556px, 0px)'
            );
        });

    });

    describe('position clamp', function() {

        it('works with top/start and right edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/top-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1473px, 0px)'
            );
        });

        it('works with top/center and right edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/top-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1473px, 0px)'
            );
        });

        it('works with top/center and left edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/top-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1473px, 0px)'
            );
        });

        it('works with top/end and left edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/top-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1473px, 0px)'
            );
        });

        it('works with right/start and bottom edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/right-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1513px, 0px)'
            );
        });

        it('works with right/center and top edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/right-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1600px, 0px)'
            );
        });

        it('works with right/center and bottom edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/right-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1513px, 0px)'
            );
        });

        it('works with right/end and top edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/right-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1600px, 0px)'
            );
        });

        it('works with bottom/start and right edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/bottom-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1640px, 0px)'
            );
        });

        it('works with bottom/center and right edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/bottom-center-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1640px, 0px)'
            );
        });

        it('works with bottom/center and left edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/bottom-center-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it('works with bottom/end and left edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/bottom-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it('works with left/start and bottom edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/left-start-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1513px, 0px)'
            );
        });

        it('works with left/center and top edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/left-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1600px, 0px)'
            );
        });

        it('works with left/center and bottom edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/left-center-bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1513px, 0px)'
            );
        });

        it('works with left/end and top edge', async function() {
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
            await screenshot('./screens/dropdown/position-clamp/left-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1600px, 0px)'
            );
        });

    });

    describe('fixed option', function() {

        it('works with top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1500);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    fixed: true,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/fixed/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1473px, 0px)'
            );
        });

        it('works with right edge', async function() {
            await exec(_ => {
                dom.setScrollX(window, 600);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    fixed: true,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/fixed/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1556px, 0px)'
            );
        });

        it('works with bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(window, 1135);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'center',
                    fixed: true,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/fixed/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it('works with left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1100);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'center',
                    fixed: true,
                    duration: 0
                });
                dropdown.show();
                return dom.getStyle('.dropdown-menu', 'transform');
            });
            await screenshot('./screens/dropdown/fixed/left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1556px, 0px)'
            );
        });

    });

    describe('spacing option', function() {

        it('works with spacing and top', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    spacing: 50,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/spacing/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1426px, 0px)'
            );
        });

        it('works with spacing and right', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    spacing: 50,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/spacing/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1371px, 1556px, 0px)'
            );
        });

        it('works with spacing and bottom', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'center',
                    spacing: 50,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/spacing/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1687px, 0px)'
            );
        });

        it('works with spacing and left', async function() {
            await exec(_ => {
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'center',
                    spacing: 50,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/spacing/left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(974px, 1556px, 0px)'
            );
        });

    });

    describe('minContact option', function() {

        it('works with minContact and top edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1620);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    minContact: 10,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/min-contact/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1620px, 0px)'
            );
        });

        it('works with minContact and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 480);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    minContact: 10,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/min-contact/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1104px, 1473px, 0px)'
            );
        });

        it('works with minContact and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1015);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'center',
                    minContact: 10,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/min-contact/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1491px, 0px)'
            );
        });

        it('works with minContact and left edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1220);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'center',
                    minContact: 10,
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/min-contact/left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1220px, 1640px, 0px)'
            );
        });

    });

});