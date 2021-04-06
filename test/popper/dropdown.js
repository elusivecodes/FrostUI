const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper dropdown', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div class="text-center" style="padding: 1600px 1200px;">' +
                '<div class="dropdown">' +
                '<button class="btn btn-secondary dropdown-toggle" id="dropdownToggle" type="button">Dropdown</button>' +
                '<div class="dropdown-menu">' +
                '<button class="dropdown-item" type="button">Action</button>' +
                '<button class="dropdown-item" type="button">Action</button>' +
                '<button class="dropdown-item" type="button">Action</button>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            dom.setScroll(document, 850, 1300);
        });
    });

    describe('#update', function() {

        it('updates the popper position', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        placement: 'top',
                        position: 'center',
                        duration: 0
                    });
                    dropdown.show();
                    dom.setScrollY(document, 1500);
                    dropdown.update();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it('updates the popper position (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#dropdownToggle').dropdown({
                        placement: 'top',
                        position: 'center',
                        duration: 0
                    }).show();
                    dom.setScrollY(document, 1500);
                    dom.query('#dropdownToggle').dropdown('update');
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

    });

    describe('placement/position options', function() {

        it('works with placement option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        placement: 'top',
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1473px, 0px)'
            );
        });

        it('works with placement option (data-ui-placement)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    dom.setDataset(dropdownToggle, 'uiPlacement', 'top');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1473px, 0px)'
            );
        });

        it('works with placement option (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#dropdownToggle').dropdown({
                        placement: 'top',
                        duration: 0
                    }).show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1473px, 0px)'
            );
        });

        it('works with position option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        position: 'center',
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it('works with position option (data-ui-position)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    dom.setDataset(dropdownToggle, 'uiPosition', 'center');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it('works with position option (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#dropdownToggle').dropdown({
                        position: 'center',
                        duration: 0
                    }).show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it('works with auto placement (top)', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1100);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement-auto/top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1473px, 0px)'
            );
        });

        it('works with auto placement (right)', async function() {
            await exec(_ => {
                dom.setScrollX(document, 1050);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement-auto/right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1556px, 0px)'
            );
        });

        it('works with auto placement (bottom)', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1500);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement-auto/bottom.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it('works with auto placement (left)', async function() {
            await exec(_ => {
                dom.setScrollX(document, 650);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'auto',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/placement-auto/left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1556px, 0px)'
            );
        });

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
                dom.setScrollX(document, 600);
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
                dom.setScrollY(document, 1135);
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
                dom.setScrollY(document, 1035);
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
                dom.setScrollY(document, 1600);
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
                dom.setScrollY(document, 1035);
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
                dom.setScrollY(document, 1600);
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
                dom.setScrollX(document, 500);
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
                dom.setScrollX(document, 500);
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
                dom.setScrollX(document, 1200);
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
                dom.setScrollX(document, 1200);
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
                dom.setScrollY(document, 1035);
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
                dom.setScrollY(document, 1035);
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

        it('works with fixed option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollY(document, 1135);
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        fixed: true,
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it('works with fixed option (data-ui-fixed)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollY(document, 1135);
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    dom.setDataset(dropdownToggle, 'uiFixed', 'true');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it('works with fixed option (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollY(document, 1135);
                    dom.query('#dropdownToggle').dropdown({
                        fixed: true,
                        duration: 0
                    }).show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

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
                dom.setScrollX(document, 600);
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
                dom.setScrollY(document, 1135);
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

        it('works with spacing option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        spacing: 50,
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1687px, 0px)'
            );
        });

        it('works with spacing option (data-ui-spacing)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    dom.setDataset(dropdownToggle, 'uiSpacing', 50);
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1687px, 0px)'
            );
        });

        it('works with spacing option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#dropdownToggle').dropdown({
                        spacing: 50,
                        duration: 0
                    }).show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1687px, 0px)'
            );
        });

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

        it('works with minContact option', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollX(document, 1220);
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        minContact: 10,
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1220px, 1640px, 0px)'
            );
        });

        it('works with minContact option (data-ui-min-contact)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollX(document, 1220);
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    dom.setDataset(dropdownToggle, 'uiMinContact', 10);
                    const dropdown = UI.Dropdown.init(dropdownToggle, {
                        duration: 0
                    });
                    dropdown.show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1220px, 1640px, 0px)'
            );
        });

        it('works with minContact option (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setScrollX(document, 1220);
                    dom.query('#dropdownToggle').dropdown({
                        minContact: 10,
                        duration: 0
                    }).show();
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1220px, 1640px, 0px)'
            );
        });

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