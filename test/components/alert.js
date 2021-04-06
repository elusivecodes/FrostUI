const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Alert', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div class="alert" id="alert1">' +
                '<button id="button1" data-ui-dismiss="alert" type="button"></button>' +
                '</div>' +
                '<div class="alert" id="alert2">' +
                '<button id="button2" data-ui-dismiss="alert" type="button"></button>' +
                '</div>'
            );
        });
    });

    describe('#init', function() {

        it('creates an alert', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const alert1 = dom.findOne('#alert1');
                    return UI.Alert.init(alert1) instanceof UI.Alert;
                }),
                true
            );
        });

        it('creates an alert (data-ui-toggle)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.click('#button1');
                    return dom.getData('#alert1', 'alert') instanceof UI.Alert;
                }),
                true
            );
        });

        it('creates an alert (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#alert1').alert();
                    return dom.getData('#alert1', 'alert') instanceof UI.Alert;
                }),
                true
            );
        });

        it('creates multiple alerts (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('.alert').alert();
                    return dom.find('.alert').every(node =>
                        dom.getData(node, 'alert') instanceof UI.Alert
                    );
                }),
                true
            );
        });

        it('returns the alert (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#alert1').alert() instanceof UI.Alert;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it('removes the alert', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const alert1 = dom.findOne('#alert1');
                    UI.Alert.init(alert1).dispose();
                    return dom.hasData(alert1, 'alert');
                }),
                false
            );
        });

        it('removes the alert (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#alert1').alert('dispose');
                    return dom.hasData('#alert1', 'alert');
                }),
                false
            );
        });

        it('removes multiple alerts (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('.alert').alert('dispose');
                    return dom.find('.alert').some(node =>
                        dom.hasData(node, 'alert')
                    );
                }),
                false
            );
        });

        it('clears alert memory', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const alert1 = dom.findOne('#alert1');
                    const alert = UI.Alert.init(alert1);
                    alert.dispose();

                    for (const key in alert) {
                        if (Core.isObject(alert[key]) && !Core.isFunction(alert[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

        it('clears alert memory when node is removed', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const alert1 = dom.findOne('#alert1');
                    const alert = UI.Alert.init(alert1);
                    dom.remove(alert1);

                    for (const key in alert) {
                        if (Core.isObject(alert[key]) && !Core.isFunction(alert[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

    });

    describe('#close', function() {

        it('closes the alert', async function() {
            await exec(_ => {
                const alert1 = dom.findOne('#alert1');
                UI.Alert.init(alert1).close();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#alert1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="alert" id="alert2">' +
                    '<button id="button2" data-ui-dismiss="alert" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it('closes the alert (data-ui-dismiss)', async function() {
            await exec(_ => {
                dom.click('#button1');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#alert1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="alert" id="alert2">' +
                    '<button id="button2" data-ui-dismiss="alert" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it('closes the alert (query)', async function() {
            await exec(_ => {
                dom.query('#alert1').alert('close');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#alert1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="alert" id="alert2">' +
                    '<button id="button2" data-ui-dismiss="alert" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it('closes multiple alerts (query)', async function() {
            await exec(_ => {
                dom.query('.alert').alert('close');
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    ''
                );
            });
        });

        it('removes the alert after closing', async function() {
            await exec(_ => {
                const alert1 = dom.findOne('#alert1');
                UI.Alert.init(alert1).close();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasData('#alert1', 'alert')),
                    false
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(async _ => {
                const alert1 = dom.findOne('#alert1');
                UI.Alert.init(alert1)
                    .close()
                    .close()
                    .close();
            });
        });

        it('returns the alert', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const alert1 = dom.findOne('#alert1');
                    return UI.Alert.init(alert1).close() instanceof UI.Alert;
                }),
                true
            );
        });

        it('returns the alert (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#alert1').alert('close') instanceof UI.Alert;
                }),
                true
            );
        });

    });

    describe('events', function() {

        it('triggers close event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const alert1 = dom.findOne('#alert1');
                        dom.addEvent(alert1, 'close.ui.alert', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Alert.init(alert1).close();
                    });
                }),
                '<div class="alert" id="alert1">' +
                '<button id="button1" data-ui-dismiss="alert" type="button"></button>' +
                '</div>' +
                '<div class="alert" id="alert2">' +
                '<button id="button2" data-ui-dismiss="alert" type="button"></button>' +
                '</div>'
            );
        });

        it('triggers closed event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const alert1 = dom.findOne('#alert1');
                        dom.addEvent(alert1, 'closed.ui.alert', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Alert.init(alert1).close();
                    });
                }),
                '<div class="alert" id="alert2">' +
                '<button id="button2" data-ui-dismiss="alert" type="button"></button>' +
                '</div>'
            );
        });

        it('can be prevented from closing', async function() {
            await exec(async _ => {
                const alert1 = dom.findOne('#alert1');
                dom.addEvent(alert1, 'close.ui.alert', _ => {
                    return false;
                });
                UI.Alert.init(alert1).close();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="alert" id="alert1">' +
                    '<button id="button1" data-ui-dismiss="alert" type="button"></button>' +
                    '</div>' +
                    '<div class="alert" id="alert2">' +
                    '<button id="button2" data-ui-dismiss="alert" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from closing (prevent default)', async function() {
            await exec(async _ => {
                const alert1 = dom.findOne('#alert1');
                dom.addEvent(alert1, 'close.ui.alert', e => {
                    e.preventDefault();
                });
                UI.Alert.init(alert1).close();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="alert" id="alert1">' +
                    '<button id="button1" data-ui-dismiss="alert" type="button"></button>' +
                    '</div>' +
                    '<div class="alert" id="alert2">' +
                    '<button id="button2" data-ui-dismiss="alert" type="button"></button>' +
                    '</div>'
                );
            });
        });

    });

    describe('duration option', function() {

        it('works with duration option', async function() {
            await exec(_ => {
                const alert1 = dom.findOne('#alert1');
                UI.Alert.init(alert1, { duration: 200 }).close();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#alert1')),
                    true
                );
            });
        });

        it('works with duration option (data-ui-duration)', async function() {
            await exec(_ => {
                const alert1 = dom.findOne('#alert1');
                dom.setDataset(alert1, 'uiDuration', 200);
                UI.Alert.init(alert1).close();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#alert1')),
                    true
                );
            });
        });

        it('works with duration option (query)', async function() {
            await exec(_ => {
                dom.query('#alert1')
                    .alert({ duration: 200 })
                    .close();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#alert1')),
                    true
                );
            });
        });

    });

});