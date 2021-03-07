const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Modal', function() {

    afterEach(async function() {
        await exec(_ => {
            dom.removeClass(document.body, 'modal-open');
        });
    });

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                '<div id="modal1" class="modal">' +
                '<div class="modal-dialog" id="modalDialog1">' +
                '<button id="button1" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>' +
                '<div id="modal2" class="modal">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button id="button2" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>'
            );
        });
    });

    describe('#init', function() {

        it('creates a modal', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    return UI.Modal.init(modal1) instanceof UI.Modal;
                }),
                true
            );
        });

        it('creates a modal (data-ui-toggle)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.click('#modalToggle1');
                    return dom.getData('#modal1', 'modal') instanceof UI.Modal;
                }),
                true
            );
        });

        it('creates a modal (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#modal1').modal();
                    return dom.getData('#modal1', 'modal') instanceof UI.Modal;
                }),
                true
            );
        });

        it('creates multiple modals (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('.modal').modal();
                    return dom.find('.modal').every(node =>
                        dom.getData(node, 'modal') instanceof UI.Modal
                    );
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it('removes the modal', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    UI.Modal.init(modal1).dispose();
                    return dom.hasData(modal1, 'modal');
                }),
                false
            );
        });

        it('removes the modal (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#modal1').modal('dispose');
                    return dom.hasData('#modal1', 'modal');
                }),
                false
            );
        });

        it('removes multiple modals (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('.modal').modal('dispose');
                    return dom.find('.modal').some(node =>
                        dom.hasData(node, 'modal')
                    );
                }),
                false
            );
        });

        it('clears modal memory', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    const modal = UI.Modal.init(modal1);
                    modal.dispose();

                    for (const key in modal) {
                        if (Core.isObject(modal[key]) && !Core.isFunction(modal[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

        it('clears modal memory when node is removed', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    const modal = UI.Modal.init(modal1);
                    dom.remove(modal1);

                    for (const key in modal) {
                        if (Core.isObject(modal[key]) && !Core.isFunction(modal[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

    });

    describe('#show', function() {

        it('shows the modal', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('shows the modal (data-ui-toggle)', async function() {
            await exec(_ => {
                dom.click('#modalToggle1');
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('shows the modal (query)', async function() {
            await exec(_ => {
                dom.query('#modal1').modal('show');
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('shows multiple modals (query)', async function() {
            await exec(_ => {
                dom.query('.modal').modal('show');
            }).then(waitFor(300)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog2" style="">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1)
                    .show()
                    .show()
                    .show();
            });
        });

        it('can be called on shown modal', async function() {
            await exec(async _ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    UI.Modal.init(modal1).show();
                });
            });
        });

    });

    describe('#hide', function() {

        it('hides the modal', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    UI.Modal.init(modal1).hide();
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('hides the modal (data-ui-dismiss)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click('#button1');
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('hides the modal (query)', async function() {
            await exec(_ => {
                dom.query('#modal1').modal('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#modal1').modal('hide');
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('hides multiple modals (query)', async function() {
            await exec(_ => {
                dom.query('.modal').modal('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('#modalDialog2');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('.modal').modal('hide');
                });
            }).then(waitFor(300)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog2" style="">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('does not remove the modal after hiding', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    UI.Modal.init(modal1).hide();
                });
            }).then(waitFor(250)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getData('#modal1', 'modal') instanceof UI.Modal),
                    true
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const modal1 = dom.findOne('#modal1');
                    UI.Modal.init(modal1)
                        .hide()
                        .hide()
                        .hide();
                });
            });
        });

        it('can be called on hidden modal', async function() {
            await exec(async _ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).hide();
            });
        });

    });

    describe('#toggle (show)', function() {

        it('shows the modal', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).toggle();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('shows the modal (query)', async function() {
            await exec(_ => {
                dom.query('#modal1').modal('toggle');
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('shows multiple modals (query)', async function() {
            await exec(_ => {
                dom.query('.modal').modal('toggle');
            }).then(waitFor(300)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog2" style="">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1)
                    .toggle()
                    .toggle()
                    .toggle();
            });
        });

    });

    describe('#toggle (hide)', function() {

        it('hides the modal', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    UI.Modal.init(modal1).toggle();
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('hides the modal (query)', async function() {
            await exec(_ => {
                dom.query('#modal1').modal('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#modal1').modal('toggle');
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('hides multiple modals (query)', async function() {
            await exec(_ => {
                dom.query('.modal').modal('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('#modalDialog2');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('.modal').modal('toggle');
                });
            }).then(waitFor(300)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog2" style="">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const modal1 = dom.findOne('#modal1');
                    UI.Modal.init(modal1)
                        .toggle()
                        .toggle()
                        .toggle();
                });
            });
        });

    });

    describe('events', function() {

        it('triggers show event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const modal1 = dom.findOne('#modal1');
                        dom.addEvent(modal1, 'show.ui.modal', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Modal.init(modal1).show();
                    });
                }),
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                '<div id="modal1" class="modal">' +
                '<div class="modal-dialog" id="modalDialog1">' +
                '<button id="button1" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>' +
                '<div id="modal2" class="modal">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button id="button2" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>'
            );
        });

        it('triggers shown event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const modal1 = dom.findOne('#modal1');
                        dom.addEvent(modal1, 'shown.ui.modal', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Modal.init(modal1).show();
                    });
                }),
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                '<div id="modal1" class="modal show" aria-modal="true">' +
                '<div class="modal-dialog" id="modalDialog1" style="">' +
                '<button id="button1" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>' +
                '<div id="modal2" class="modal">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button id="button2" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>' +
                '<div class="modal-backdrop" style=""></div>'
            );
        });

        it('triggers hide event', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const modal1 = dom.findOne('#modal1');
                            dom.addEvent(modal1, 'hide.ui.modal', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Modal.init(modal1).hide();
                        });
                    }),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('triggers hidden event', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const modal1 = dom.findOne('#modal1');
                            dom.addEvent(modal1, 'hidden.ui.modal', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Modal.init(modal1).hide();
                        });
                    }),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('triggers show event (toggle)', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const modal1 = dom.findOne('#modal1');
                        dom.addEvent(modal1, 'show.ui.modal', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Modal.init(modal1).toggle();
                    });
                }),
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                '<div id="modal1" class="modal">' +
                '<div class="modal-dialog" id="modalDialog1">' +
                '<button id="button1" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>' +
                '<div id="modal2" class="modal">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button id="button2" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>'
            );
        });

        it('triggers shown event (toggle)', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const modal1 = dom.findOne('#modal1');
                        dom.addEvent(modal1, 'shown.ui.modal', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Modal.init(modal1).toggle();
                    });
                }),
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                '<div id="modal1" class="modal show" aria-modal="true">' +
                '<div class="modal-dialog" id="modalDialog1" style="">' +
                '<button id="button1" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>' +
                '<div id="modal2" class="modal">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button id="button2" data-ui-dismiss="modal"></button>' +
                '</div>' +
                '</div>' +
                '<div class="modal-backdrop" style=""></div>'
            );
        });

        it('triggers hide event (toggle)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const modal1 = dom.findOne('#modal1');
                            dom.addEvent(modal1, 'hide.ui.modal', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Modal.init(modal1).toggle();
                        });
                    }),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('triggers hidden event (toggle)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const modal1 = dom.findOne('#modal1');
                            dom.addEvent(modal1, 'hidden.ui.modal', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Modal.init(modal1).toggle();
                        });
                    }),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from showing', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                dom.addEvent(modal1, 'show.ui.modal', _ => {
                    return false;
                })
                UI.Modal.init(modal1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog1">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from showing (prevent default)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                dom.addEvent(modal1, 'show.ui.modal', e => {
                    e.preventDefault();
                })
                UI.Modal.init(modal1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog1">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from hiding', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const modal1 = dom.findOne('#modal1');
                    dom.addEvent(modal1, 'hide.ui.modal', _ => {
                        return false;
                    })
                    UI.Modal.init(modal1).hide();
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('can be prevented from hiding (prevent default)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const modal1 = dom.findOne('#modal1');
                    dom.addEvent(modal1, 'hide.ui.modal', e => {
                        e.preventDefault();
                    })
                    UI.Modal.init(modal1).hide();
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

    });

    describe('duration option', function() {

        it('works with duration option on show', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1, { duration: 200 }).show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            });
        });

        it('works with duration option on show (data-ui-duration)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                dom.setDataset(modal1, 'uiDuration', 200);
                UI.Modal.init(modal1).show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            });
        });

        it('works with duration option on show (query)', async function() {
            await exec(_ => {
                dom.query('#modal1')
                    .modal({ duration: 200 })
                    .show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            });
        });

        it('works with duration option on hide', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1, { duration: 200 }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    UI.Modal.init(modal1).hide();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            });
        });

        it('works with duration option on hide (data-ui-duration)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                dom.setDataset(modal1, 'uiDuration', 200);
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    UI.Modal.init(modal1).hide();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            });
        });

        it('works with duration option on hide (query)', async function() {
            await exec(_ => {
                dom.query('#modal1')
                    .modal({ duration: 200 })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#modal1').modal('hide');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            });
        });

    });

    describe('keyboard option', function() {

        it('hides the modal on escape', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const event = new KeyboardEvent('keyup', {
                        bubbles: true,
                        code: 'Escape'
                    });
                    document.body.dispatchEvent(event);
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('works with keyboard option', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1, { keyboard: false }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const event = new KeyboardEvent('keyup', {
                        bubbles: true,
                        code: 'Escape'
                    });
                    document.body.dispatchEvent(event);
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('works with keyboard option (data-ui-keyboard)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                dom.setDataset(modal1, 'uiKeyboard', false);
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const event = new KeyboardEvent('keyup', {
                        bubbles: true,
                        code: 'Escape'
                    });
                    document.body.dispatchEvent(event);
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" data-ui-keyboard="false" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('works with keyboard option (query)', async function() {
            await exec(_ => {
                dom.query('#modal1')
                    .modal({ keyboard: false })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const event = new KeyboardEvent('keyup', {
                        bubbles: true,
                        code: 'Escape'
                    });
                    document.body.dispatchEvent(event);
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

    });

    describe('show option', function() {

        it('works with show option', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1, { show: true });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('works without show option', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1);
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog1">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

    });

    describe('backdrop option', function() {

        it('works with backdrop option', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1, { backdrop: false }).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('hides the modal on document click (with backdrop)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click(document.body);
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('does not hide the modal on document click (without backdrop)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1, { backdrop: false }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click(document.body);
                });
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1"></button>' +
                    '<button id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2"></button>' +
                    '<div id="modal1" class="modal show" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button id="button1" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="modal2" class="modal">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button id="button2" data-ui-dismiss="modal"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

    });

});