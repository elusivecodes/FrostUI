const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Tab', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab1"></div>' +
                '<div class="tab-pane" id="tab2"></div>' +
                '</div>' +
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab3"></div>' +
                '<div class="tab-pane" id="tab4"></div>' +
                '</div>'
            );
        });
    });

    describe('#init', function() {

        it('creates a tab', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tabToggle1 = dom.findOne('#tabToggle1');
                    return UI.Tab.init(tabToggle1) instanceof UI.Tab;
                }),
                true
            );
        });

        it('creates a tab (data-ui-toggle)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.click('#tabToggle1');
                    return dom.getData('#tabToggle1', 'tab') instanceof UI.Tab;
                }),
                true
            );
        });

        it('creates a tab (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#tabToggle1').tab();
                    return dom.getData('#tabToggle1', 'tab') instanceof UI.Tab;
                }),
                true
            );
        });

        it('creates multiple tabs (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('a').tab();
                    return dom.find('a').every(node =>
                        dom.getData(node, 'tab') instanceof UI.Tab
                    );
                }),
                true
            );
        });

        it('returns the tab (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#tabToggle1').tab() instanceof UI.Tab;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it('removes the tab', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tabToggle1 = dom.findOne('#tabToggle1');
                    UI.Tab.init(tabToggle1).dispose();
                    return dom.hasData(tabToggle1, 'tab');
                }),
                false
            );
        });

        it('removes the tab (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#tabToggle1').tab('dispose');
                    return dom.hasData('#tabToggle1', 'tab');
                }),
                false
            );
        });

        it('removes multiple tabs (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('a').tab('dispose');
                    return dom.find('a').some(node =>
                        dom.hasData(node, 'tab')
                    );
                }),
                false
            );
        });

        it('clears tab memory', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tabToggle1 = dom.findOne('#tabToggle1');
                    const tab = UI.Tab.init(tabToggle1);
                    tab.dispose();

                    for (const key in tab) {
                        if (Core.isObject(tab[key]) && !Core.isFunction(tab[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

        it('clears tab memory when node is removed', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tabToggle1 = dom.findOne('#tabToggle1');
                    const tab = UI.Tab.init(tabToggle1);
                    dom.remove(tabToggle1);

                    for (const key in tab) {
                        if (Core.isObject(tab[key]) && !Core.isFunction(tab[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

    });

    describe('#hide', function() {

        it('hides the tab', async function() {
            await exec(_ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                UI.Tab.init(tabToggle1).hide();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                    '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane" id="tab1" style=""></div>' +
                    '<div class="tab-pane" id="tab2"></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('hides the tab (query)', async function() {
            await exec(_ => {
                dom.query('#tabToggle1').tab('hide');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                    '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane" id="tab1" style=""></div>' +
                    '<div class="tab-pane" id="tab2"></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('hides multiple tabs (query)', async function() {
            await exec(_ => {
                dom.query('#tabToggle1, #tabToggle3').tab('hide');
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                    '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane" id="tab1" style=""></div>' +
                    '<div class="tab-pane" id="tab2"></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link" id="tabToggle3" href="#tab3" data-ui-toggle="tab" aria-selected="false"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane" id="tab3" style=""></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('does not remove the tab after hiding', async function() {
            await exec(_ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                UI.Tab.init(tabToggle1).hide();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getData('#tabToggle1', 'tab') instanceof UI.Tab),
                    true
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(async _ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                UI.Tab.init(tabToggle1)
                    .hide()
                    .hide()
                    .hide();
            });
        });

        it('can be called on hidden tab', async function() {
            await exec(async _ => {
                const tabToggle2 = dom.findOne('#tabToggle2');
                UI.Tab.init(tabToggle2).hide();
            });
        });

        it('returns the tab', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tabToggle1 = dom.findOne('#tabToggle1');
                    return UI.Tab.init(tabToggle1).hide() instanceof UI.Tab;
                }),
                true
            );
        });

        it('returns the tab (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#tabToggle1').tab('hide') instanceof UI.Tab;
                }),
                true
            );
        });

    });

    describe('#show', function() {

        it('shows the tab', async function() {
            await exec(_ => {
                const tabToggle2 = dom.findOne('#tabToggle2');
                UI.Tab.init(tabToggle2).show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab2')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                    '<a class="nav-link active" id="tabToggle2" href="#tab2" data-ui-toggle="tab" aria-selected="true"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane" id="tab1" style=""></div>' +
                    '<div class="tab-pane active" id="tab2" style=""></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('shows the tab (data-ui-toggle)', async function() {
            await exec(_ => {
                dom.click('#tabToggle2');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab2')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                    '<a class="nav-link active" id="tabToggle2" href="#tab2" data-ui-toggle="tab" aria-selected="true"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane" id="tab1" style=""></div>' +
                    '<div class="tab-pane active" id="tab2" style=""></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('shows the tab (query)', async function() {
            await exec(_ => {
                dom.query('#tabToggle2').tab('show');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab2')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                    '<a class="nav-link active" id="tabToggle2" href="#tab2" data-ui-toggle="tab" aria-selected="true"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane" id="tab1" style=""></div>' +
                    '<div class="tab-pane active" id="tab2" style=""></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('shows multiple tabs (query)', async function() {
            await exec(_ => {
                dom.query('#tabToggle2, #tabToggle4').tab('show');
            }).then(waitFor(250)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                    '<a class="nav-link active" id="tabToggle2" href="#tab2" data-ui-toggle="tab" aria-selected="true"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane" id="tab1" style=""></div>' +
                    '<div class="tab-pane active" id="tab2" style=""></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link" id="tabToggle3" href="#tab3" data-ui-toggle="tab" aria-selected="false"></a>' +
                    '<a class="nav-link active" id="tabToggle4" href="#tab4" data-ui-toggle="tab" aria-selected="true"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane" id="tab3" style=""></div>' +
                    '<div class="tab-pane active" id="tab4" style=""></div>' +
                    '</div>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(async _ => {
                const tabToggle2 = dom.findOne('#tabToggle2');
                UI.Tab.init(tabToggle2)
                    .show()
                    .show()
                    .show();
            });
        });

        it('can be called on shown tab', async function() {
            await exec(async _ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                UI.Tab.init(tabToggle1).show();
            });
        });

        it('returns the tab', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tabToggle2 = dom.findOne('#tabToggle2');
                    return UI.Tab.init(tabToggle2).show() instanceof UI.Tab;
                }),
                true
            );
        });

        it('returns the tab (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#tabToggle2').tab('show') instanceof UI.Tab;
                }),
                true
            );
        });

    });

    describe('events', function() {

        it('triggers hide event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const tabToggle1 = dom.findOne('#tabToggle1');
                        dom.addEvent(tabToggle1, 'hide.ui.tab', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Tab.init(tabToggle1).hide();
                    });
                }),
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab1"></div>' +
                '<div class="tab-pane" id="tab2"></div>' +
                '</div>' +
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab3"></div>' +
                '<div class="tab-pane" id="tab4"></div>' +
                '</div>'
            );
        });

        it('triggers hidden event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const tabToggle1 = dom.findOne('#tabToggle1');
                        dom.addEvent(tabToggle1, 'hidden.ui.tab', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Tab.init(tabToggle1).hide();
                    });
                }),
                '<div class="nav nav-tabs">' +
                '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane" id="tab1" style=""></div>' +
                '<div class="tab-pane" id="tab2"></div>' +
                '</div>' +
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab3"></div>' +
                '<div class="tab-pane" id="tab4"></div>' +
                '</div>'
            );
        });

        it('triggers show event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const tabToggle2 = dom.findOne('#tabToggle2');
                        dom.addEvent(tabToggle2, 'show.ui.tab', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Tab.init(tabToggle2).show();
                    });
                }),
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab1"></div>' +
                '<div class="tab-pane" id="tab2"></div>' +
                '</div>' +
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab3"></div>' +
                '<div class="tab-pane" id="tab4"></div>' +
                '</div>'
            );
        });

        it('triggers shown event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const tabToggle2 = dom.findOne('#tabToggle2');
                        dom.addEvent(tabToggle2, 'shown.ui.tab', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Tab.init(tabToggle2).show();
                    });
                }),
                '<div class="nav nav-tabs">' +
                '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                '<a class="nav-link active" id="tabToggle2" href="#tab2" data-ui-toggle="tab" aria-selected="true"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane" id="tab1" style=""></div>' +
                '<div class="tab-pane active" id="tab2" style=""></div>' +
                '</div>' +
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab3"></div>' +
                '<div class="tab-pane" id="tab4"></div>' +
                '</div>'
            );
        });

        it('triggers hide event on active tab', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const tabToggle1 = dom.findOne('#tabToggle1');
                        const tabToggle2 = dom.findOne('#tabToggle2');
                        dom.addEvent(tabToggle1, 'hide.ui.tab', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Tab.init(tabToggle2).show();
                    });
                }),
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab1"></div>' +
                '<div class="tab-pane" id="tab2"></div>' +
                '</div>' +
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab3"></div>' +
                '<div class="tab-pane" id="tab4"></div>' +
                '</div>'
            );
        });

        it('triggers hidden event on active tab', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const tabToggle1 = dom.findOne('#tabToggle1');
                        const tabToggle2 = dom.findOne('#tabToggle2');
                        dom.addEvent(tabToggle1, 'hidden.ui.tab', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Tab.init(tabToggle2).show();
                    });
                }),
                '<div class="nav nav-tabs">' +
                '<a class="nav-link" id="tabToggle1" href="#tab1" data-ui-toggle="tab" aria-selected="false"></a>' +
                '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane" id="tab1" style=""></div>' +
                '<div class="tab-pane" id="tab2"></div>' +
                '</div>' +
                '<div class="nav nav-tabs">' +
                '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                '</div>' +
                '<div class="tab-content">' +
                '<div class="tab-pane active" id="tab3"></div>' +
                '<div class="tab-pane" id="tab4"></div>' +
                '</div>'
            );
        });

        it('can be prevented from hiding', async function() {
            await exec(async _ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                dom.addEvent(tabToggle1, 'hide.ui.tab', _ => {
                    return false;
                });
                UI.Tab.init(tabToggle1).hide();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab1"></div>' +
                    '<div class="tab-pane" id="tab2"></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from hiding (prevent default)', async function() {
            await exec(async _ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                dom.addEvent(tabToggle1, 'hide.ui.tab', e => {
                    e.preventDefault();
                });
                UI.Tab.init(tabToggle1).hide();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab1"></div>' +
                    '<div class="tab-pane" id="tab2"></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from showing', async function() {
            await exec(async _ => {
                const tabToggle2 = dom.findOne('#tabToggle2');
                dom.addEvent(tabToggle2, 'show.ui.tab', _ => {
                    return false;
                });
                UI.Tab.init(tabToggle2).show();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab1"></div>' +
                    '<div class="tab-pane" id="tab2"></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from showing (prevent default)', async function() {
            await exec(async _ => {
                const tabToggle2 = dom.findOne('#tabToggle2');
                dom.addEvent(tabToggle2, 'show.ui.tab', e => {
                    e.preventDefault();
                });
                UI.Tab.init(tabToggle2).show();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab1"></div>' +
                    '<div class="tab-pane" id="tab2"></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from hiding active tab', async function() {
            await exec(async _ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                const tabToggle2 = dom.findOne('#tabToggle2');
                dom.addEvent(tabToggle1, 'hide.ui.tab', _ => {
                    return false;
                });
                UI.Tab.init(tabToggle2).show();
            }).then(waitFor(250)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab1"></div>' +
                    '<div class="tab-pane" id="tab2"></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from hiding active tab (prevent default)', async function() {
            await exec(async _ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                const tabToggle2 = dom.findOne('#tabToggle2');
                dom.addEvent(tabToggle1, 'hide.ui.tab', e => {
                    e.preventDefault();
                });
                UI.Tab.init(tabToggle2).hide();
            }).then(waitFor(250)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle1" href="#tab1" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle2" href="#tab2" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab1"></div>' +
                    '<div class="tab-pane" id="tab2"></div>' +
                    '</div>' +
                    '<div class="nav nav-tabs">' +
                    '<a class="nav-link active" id="tabToggle3" href="#tab3" data-ui-toggle="tab"></a>' +
                    '<a class="nav-link" id="tabToggle4" href="#tab4" data-ui-toggle="tab"></a>' +
                    '</div>' +
                    '<div class="tab-content">' +
                    '<div class="tab-pane active" id="tab3"></div>' +
                    '<div class="tab-pane" id="tab4"></div>' +
                    '</div>'
                );
            });
        });

    });

    describe('duration option', function() {

        it('works with duration option on hide', async function() {
            await exec(_ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                UI.Tab.init(tabToggle1, { duration: 200 }).hide();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            });
        });

        it('works with duration option on hide (data-ui-duration)', async function() {
            await exec(_ => {
                const tabToggle1 = dom.findOne('#tabToggle1');
                dom.setDataset(tabToggle1, 'uiDuration', 200);
                UI.Tab.init(tabToggle1).hide();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            });
        });

        it('works with duration option on hide (query)', async function() {
            await exec(_ => {
                dom.query('#tabToggle1')
                    .tab({ duration: 200 })
                    .hide();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            });
        });

        it('works with duration option on show', async function() {
            await exec(_ => {
                const tabToggle2 = dom.findOne('#tabToggle2');
                UI.Tab.init(tabToggle2, { duration: 200 }).show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab2')),
                    true
                );
            });
        });

        it('works with duration option on show (data-ui-duration)', async function() {
            await exec(_ => {
                const tabToggle2 = dom.findOne('#tabToggle2');
                dom.setDataset(tabToggle2, 'uiDuration', 200);
                UI.Tab.init(tabToggle2).show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab2')),
                    true
                );
            });
        });

        it('works with duration option on show (query)', async function() {
            await exec(_ => {
                dom.query('#tabToggle2')
                    .tab({ duration: 200 })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab1')),
                    true
                );
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tab2')),
                    true
                );
            });
        });

    });

});