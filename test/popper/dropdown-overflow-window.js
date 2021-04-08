const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper dropdown (overflow/window)', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div style="width: calc(100vw + 1800px); padding: 1300px 900px;">' +
                '<div id="scroll" style="position: relative; overflow: auto; width: 100vw; height: 100vh;">' +
                '<div class="text-center" style="padding: 1600px 1200px;">' +
                '<div class="dropdown">' +
                '<button class="btn btn-secondary dropdown-toggle" id="dropdownToggle" type="button">Dropdown</button>' +
                '<div class="dropdown-menu">' +
                '<button class="dropdown-item" type="button">Action</button>' +
                '<button class="dropdown-item" type="button">Action</button>' +
                '<button class="dropdown-item" type="button">Action</button>' +
                '</div>' +
                '</div>' +
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
                dom.setScrollY(document, 1500);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-placement-flip/top-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1172px, 1640px, 0px)'
            );
        });

        it('works with right/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 615);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-placement-flip/right-center-right.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-placement-flip/bottom-center-bottom.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-placement-flip/left-center-left.jpeg');

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
                dom.setScrollX(document, 515);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-position-clamp/top-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1473px, 0px)'
            );
        });

        it('works with top/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 515);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'top',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-position-clamp/top-center-right.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-position-clamp/top-center-left.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-position-clamp/top-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1473px, 0px)'
            );
        });

        it('works with right/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1050);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-position-clamp/right-start-bottom.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-position-clamp/right-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1600px, 0px)'
            );
        });

        it('works with right/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1050);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'right',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-position-clamp/right-center-bottom.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-position-clamp/right-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1324px, 1600px, 0px)'
            );
        });

        it('works with bottom/start and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 515);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-position-clamp/bottom-start-right.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1145px, 1640px, 0px)'
            );
        });

        it('works with bottom/center and right edge', async function() {
            await exec(_ => {
                dom.setScrollX(document, 515);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'bottom',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-position-clamp/bottom-center-right.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-position-clamp/bottom-center-left.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-position-clamp/bottom-end-left.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1200px, 1640px, 0px)'
            );
        });

        it('works with left/start and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1050);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'start',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-position-clamp/left-start-bottom.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-position-clamp/left-center-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1600px, 0px)'
            );
        });

        it('works with left/center and bottom edge', async function() {
            await exec(_ => {
                dom.setScrollY(document, 1050);
                const dropdownToggle = dom.findOne('#dropdownToggle');
                const dropdown = UI.Dropdown.init(dropdownToggle, {
                    placement: 'left',
                    position: 'center',
                    duration: 0
                });
                dropdown.show();
            });
            await screenshot('./screens/dropdown/overflow-window-position-clamp/left-center-bottom.jpeg');

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
            await screenshot('./screens/dropdown/overflow-window-position-clamp/left-end-top.jpeg');

            assert.strictEqual(
                await exec(_ => {
                    return dom.getStyle('.dropdown-menu', 'transform');
                }),
                'translate3d(1021px, 1600px, 0px)'
            );
        });

    });

});