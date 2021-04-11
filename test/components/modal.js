const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Modal', function() {

    afterEach(async function() {
        await exec(_ => {
            dom.removeClass(document.body, 'modal-open');
            dom.removeAttribute(document.body, 'style');
        });
    });

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                '<div class="modal" id="modal1">' +
                '<div class="modal-dialog" id="modalDialog1">' +
                '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                '</div>' +
                '</div>' +
                '<div class="modal" id="modal2">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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

        it('returns the modal (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#modal1').modal() instanceof UI.Modal;
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
                    dom.setHTML(document.body, '');
                    // dom.remove(modal1);

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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
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

        it('allows modals to stack', async function() {
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
                    const modal2 = dom.findOne('#modal2');
                    UI.Modal.init(modal2).show();
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog2');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getHTML(document.body);
                    }),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal show" id="modal2" aria-modal="true" style="z-index: 1080;">' +
                    '<div class="modal-dialog" id="modalDialog2" style="">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>' +
                    '<div class="modal-backdrop" style="z-index: 1070;"></div>'
                );
            });
        });

        it('returns the modal', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    return UI.Modal.init(modal1).show() instanceof UI.Modal;
                }),
                true
            );
        });

        it('returns the modal (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#modal1').modal('show') instanceof UI.Modal;
                }),
                true
            );
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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

        it('does not close stacked modals (data-ui-dismiss)', async function() {
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
                    const modal2 = dom.findOne('#modal2');
                    UI.Modal.init(modal2).show();
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog2');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click('#button2');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog2');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getHTML(document.body);
                    }),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2" aria-hidden="true" style="">' +
                    '<div class="modal-dialog" id="modalDialog2" style="">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('returns the modal', async function() {
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
                    await exec(_ => {
                        const modal1 = dom.findOne('#modal1');
                        return UI.Modal.init(modal1).hide() instanceof UI.Modal;
                    }),
                    true
                );
            });
        });

        it('returns the modal (query)', async function() {
            await exec(_ => {
                dom.query('#modal1').modal('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.query('#modal1').modal('hide') instanceof UI.Modal;
                    }),
                    true
                );
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
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

        it('returns the modal', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const modal1 = dom.findOne('#modal1');
                    return UI.Modal.init(modal1).toggle() instanceof UI.Modal;
                }),
                true
            );
        });

        it('returns the modal (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#modal1').modal('toggle') instanceof UI.Modal;
                }),
                true
            );
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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

        it('returns the modal', async function() {
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
                    await exec(_ => {
                        const modal1 = dom.findOne('#modal1');
                        return UI.Modal.init(modal1).toggle() instanceof UI.Modal;
                    }),
                    true
                );
            });
        });

        it('returns the modal (query)', async function() {
            await exec(_ => {
                dom.query('#modal1').modal('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.query('#modal1').modal('toggle') instanceof UI.Modal;
                    }),
                    true
                );
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
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                '<div class="modal" id="modal1">' +
                '<div class="modal-dialog" id="modalDialog1">' +
                '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                '</div>' +
                '</div>' +
                '<div class="modal" id="modal2">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                '<div class="modal show" id="modal1" aria-modal="true">' +
                '<div class="modal-dialog" id="modalDialog1" style="">' +
                '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                '</div>' +
                '</div>' +
                '<div class="modal" id="modal2">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                '<div class="modal" id="modal1">' +
                '<div class="modal-dialog" id="modalDialog1">' +
                '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                '</div>' +
                '</div>' +
                '<div class="modal" id="modal2">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                '<div class="modal show" id="modal1" aria-modal="true">' +
                '<div class="modal-dialog" id="modalDialog1" style="">' +
                '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                '</div>' +
                '</div>' +
                '<div class="modal" id="modal2">' +
                '<div class="modal-dialog" id="modalDialog2">' +
                '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1">' +
                    '<div class="modal-dialog" id="modalDialog1">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1">' +
                    '<div class="modal-dialog" id="modalDialog1">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" data-ui-keyboard="false" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('works with show option (data-ui-show))', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                dom.setDataset(modal1, 'uiShow', true);
                UI.Modal.init(modal1);
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" data-ui-show="true" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('works with show option (query)', async function() {
            await exec(_ => {
                dom.query('#modal1').modal({ show: true });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1">' +
                    '<div class="modal-dialog" id="modalDialog1">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('works with backdrop option (data-ui-backdrop))', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                dom.setDataset(modal1, 'uiBackdrop', false);
                UI.Modal.init(modal1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" data-ui-backdrop="false" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('works with backdrop option (query)', async function() {
            await exec(_ => {
                dom.query('#modal1')
                    .modal({ backdrop: false })
                    .show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
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
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('does not hide the modal on document click (static backdrop)', async function() {
            await exec(_ => {
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1, { backdrop: 'static' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click(document.body);
                });
            }).then(waitFor(250)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('does not hide the modal on document click (mousedown on dialog)', async function() {
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
                    dom.triggerEvent('#modalDialog1', 'mousedown');
                    dom.click(document.body);
                });
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

        it('hides the modal on dialog click (mousedown on backdrop)', async function() {
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
                    dom.triggerEvent('.modal-backdrop', 'mousedown');
                    dom.click('#modalDialog1');
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog1') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal" id="modal1" aria-hidden="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2">' +
                    '<div class="modal-dialog" id="modalDialog2">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>'
                );
            });
        });

        it('does not close stacked modals on document click', async function() {
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
                    const modal2 = dom.findOne('#modal2');
                    UI.Modal.init(modal2).show();
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog2');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click(document.body);
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog2');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getHTML(document.body);
                    }),
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="modalToggle1" data-ui-toggle="modal" data-ui-target="#modal2" type="button"></button>' +
                    '<div class="modal show" id="modal1" aria-modal="true">' +
                    '<div class="modal-dialog" id="modalDialog1" style="">' +
                    '<button class="btn-close" id="button1" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal" id="modal2" aria-hidden="true" style="">' +
                    '<div class="modal-dialog" id="modalDialog2" style="">' +
                    '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop" style=""></div>'
                );
            });
        });

    });

    describe('scroll padding', function() {

        it('adds scroll padding (vertical)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'height', '2000px');
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    '15px'
                );
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle('#modalDialog1', 'paddingRight');
                    }),
                    '15px'
                );
            });
        });

        it('adds scroll padding (horizontal)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'width', '2000px');
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    '15px'
                );
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle('#modalDialog1', 'paddingBottom');
                    }),
                    '15px'
                );
            });
        });

        it('does not add padding if scrollbars are hidden (vertical)', async function() {
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
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    ''
                );
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle('#modalDialog1', 'paddingRight');
                    }),
                    ''
                );
            });
        });

        it('does not add padding if scrollbars are hidden (horizontal)', async function() {
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
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    ''
                );
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle('#modalDialog1', 'paddingBottom');
                    }),
                    ''
                );
            });
        });

        it('works with existing padding (vertical)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'height', '2000px');
                dom.setStyle(document.body, 'paddingRight', '10px');
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    '25px'
                );
            });
        });

        it('works with existing padding (horizontal)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'width', '2000px');
                dom.setStyle(document.body, 'paddingBottom', '10px');
                const modal1 = dom.findOne('#modal1');
                UI.Modal.init(modal1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    '25px'
                );
            });
        });

        it('restores scroll padding (vertical)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'height', '2000px');
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
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    ''
                );
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle('#modalDialog1', 'paddingRight');
                    }),
                    ''
                );
            });
        });

        it('restores scroll padding (horizontal)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'width', '2000px');
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
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    ''
                );
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle('#modalDialog1', 'paddingBottom');
                    }),
                    ''
                );
            });
        });

        it('restores existing scroll padding to document body (vertical)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'height', '2000px');
                dom.setStyle(document.body, 'paddingRight', '10px');
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
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    '10px'
                );
            });
        });

        it('restores existing scroll padding to document body (horizontal)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'width', '2000px');
                dom.setStyle(document.body, 'paddingBottom', '10px');
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
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog1');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    '10px'
                );
            });
        });

    });

});