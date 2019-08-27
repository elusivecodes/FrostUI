/**
 * Modal Class
 * @class
 */
class Modal {

    /**
     * New Modal constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Modal with.
     * @returns {Modal} A new Modal object.
     */
    constructor(node, settings) {
        this._node = node;
        this._settings = {
            ...Modal.defaults,
            ...dom.getDataset(node),
            ...settings
        };

        this._dialog = dom.child(this._node, '.modal-dialog').shift();

        this._dialogClickEvent = e => {
            if (dom.is(e.target, '[data-dismiss="modal"]') || dom.closest(e.target, '[data-dismiss="modal"]').length) {
                return;
            }

            e.stopPropagation();
        };

        dom.addEvent(this._dialog, 'click.frost.modal', this._dialogClickEvent);

        this._windowKeyDownEvent = e => {
            if (e.key !== 'Escape') {
                return;
            }

            e.preventDefault();

            this.hide();
        };

        if (this._settings.show) {
            this.show();
        }

        dom.setData(this._node, 'modal', this);
    }

    /**
     * Destroy the Modal.
     */
    destroy() {
        dom.stop([this._dialog, this._backdrop], true);

        if (this._settings.keyboard) {
            dom.removeEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
        }

        dom.removeEvent(this._dialog, 'click.frost.modal', this._dialogClickEvent);

        dom.removeData(this._node, 'modal');
    }

    /**
     * Hide the Modal.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (!dom.hasClass(this._node, 'show') || dom.getDataset(this._dialog, 'animating') === 'true') {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'hide.frost.modal')) {
                return reject();
            }

            dom.setDataset([this._dialog, this._backdrop], 'animating', 'true');

            dom.removeEvent(this._backdrop, 'click.frost.autocomplete');
            Promise.all([
                dom.fadeOut(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.dropOut(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.fadeOut(this._backdrop, {
                    duration: this._settings.duration
                })
            ]).then(_ => {
                if (this._settings.backdrop) {
                    dom.remove(this._backdrop);
                    this._backdrop = null;
                }

                if (this._settings.keyboard) {
                    dom.removeEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
                }

                dom.removeClass(this._node, 'show');
                dom.removeClass(document.body, 'modal-open');
                dom.triggerEvent(this._node, 'hidden.frost.modal');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ =>
                dom.removeAttribute([this._dialog, this._backdrop], 'data-animating')
            );
        });
    }

    /**
     * Show the Modal.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (dom.hasClass(this._node, 'show') || dom.getDataset(this._dialog, 'animating') === 'true') {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'show.frost.modal')) {
                return reject();
            }

            if (this._settings.backdrop) {
                this._backdrop = dom.create('div', {
                    class: 'modal-backdrop'
                });
                dom.append(document.body, this._backdrop);
            }

            dom.setDataset([this._dialog, this._backdrop], 'animating', 'true');

            dom.addClass(this._node, 'show');
            dom.addClass(document.body, 'modal-open');

            Promise.all([
                dom.fadeIn(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.dropIn(this._dialog, {
                    duration: this._settings.duration
                })
                , dom.fadeIn(this._backdrop, {
                    duration: this._settings.duration
                })
            ]).then(_ => {
                if (this._settings.backdrop) {
                    dom.addEventOnce(document.body, 'click.frost.modal', _ => {
                        this.hide();
                    });
                }

                if (this._settings.keyboard) {
                    dom.addEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
                }

                if (this._settings.focus) {
                    dom.focus(this._node);
                }

                dom.triggerEvent(this._node, 'shown.frost.modal');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ =>
                dom.removeAttribute([this._dialog, this._backdrop], 'data-animating')
            );
        });
    }

    /**
     * Toggle the Modal.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    toggle() {
        return dom.hasClass(this._node, 'show') ?
            this.hide() :
            this.show();
    }

}
